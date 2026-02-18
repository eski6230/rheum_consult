import { GoogleGenAI, Type } from "@google/genai";
import { ClinicalFeatures, ConsultResponse } from "../types";

export const generateRheumAssessment = async (
  data: ClinicalFeatures
): Promise<ConsultResponse> => {
  // Initialize inside the function to avoid top-level crashes if env var is missing during load
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Act as a senior Rheumatologist and Internal Medicine specialist.
    Analyze the following patient data for an inpatient consult regarding joint pain.
    
    PATIENT DEMOGRAPHICS:
    - Age: ${data.age || 'Unknown'}
    - Gender: ${data.gender}
    
    PATIENT DATA:
    - Joint Pattern: ${data.pattern}
    - Onset: ${data.onset}
    - Affected Joints: ${data.affectedJoints.join(", ") || "Unspecified"}
    
    CHARACTERISTICS & SIGNS:
    - Morning Stiffness (>1hr): ${data.morningStiffness ? "Yes" : "No"}
    - Improved with Exercise (Inflammatory): ${data.betterWithActivity ? "Yes" : "No"}
    - Worsened with Exercise (Mechanical): ${data.worseWithActivity ? "Yes" : "No"}
    - Redness/Warmth: ${data.redness ? "Yes" : "No"}
    - Joint Swelling / Edema: ${data.jointEdema ? "Yes" : "No"}
    - Limited Range of Motion (LOM): ${data.limitedMotion ? "Yes" : "No"}
    - History of Trauma: ${data.traumaHistory ? "Yes" : "No"}
    
    SYSTEMIC / EXTRA-ARTICULAR SIGNS:
    - Fever: ${data.fever ? "Yes" : "No"}
    - Psoriasis: ${data.psoriasis ? "Yes" : "No"}
    - Malar Rash: ${data.malarRash ? "Yes" : "No"}
    - Raynaud's Phenomenon: ${data.raynauds ? "Yes" : "No"}
    - Oral Ulcers: ${data.oralUlcers ? "Yes" : "No"}
    - Genital Ulcers: ${data.genitalUlcers ? "Yes" : "No"}
    - Uveitis: ${data.uveitis ? "Yes" : "No"}
    - Dry Eye/Mouth (Sicca): ${data.dryEyeMouth ? "Yes" : "No"}
    - Chronic Diarrhea: ${data.diarrhea ? "Yes" : "No"}
    - ILD (Interstitial Lung Disease): ${data.ild ? "Yes" : "No"}
    - Other Signs: ${data.customSigns}
    
    HISTORY & LABS:
    - Medications: ${data.medications}
    - Comorbidities: ${data.comorbidities}
    - Relevant Labs/Vitals: ${data.labs}

    TASK:
    1. Provide a differential diagnosis list tailored to Rheumatology.
    2. Draft a professional, structured Medical Consult Note (SOAP format).
    3. Provide a list of "Clinical Pearls & Safety Checks" (reminders for the doctor).

    FORMATTING RULES FOR CONSULT NOTE (Strictly follow this):
    - Language: The content must be in ${data.language}.
    - Structure: Use clearly separated S, O, A, P sections.
    - **CRITICAL**: Use Markdown headers (e.g., ### Subjective) for section titles.
    - **CRITICAL**: Insert TWO blank lines between each section (S, O, A, P) to ensure visual separation in the output.
    
    [Assessment (A) Section Requirements]:
    - Use a "Problem List" format.
    - Example format:
      #1. [Main Symptom/Location] (e.g., Rt. MTP pain with heating sense)
          r/o Gout
          r/o CPPD
          r/o Septic arthritis -- [comment on likelihood]

    [Plan (P) Section Requirements]:
    - **CRITICAL**: Start the Plan section with a 1-2 sentence narrative summary/impression. 
      (e.g., "This patient was referred for acute Lt. 1st PIP pain... Gout is most likely given the clinical presentation...")
    - Then list specific Diagnostic Workup and Therapeutic Plans.
    - If Gout is suspected: Explicitly mention checking **HLA-B5801** before starting Allopurinol (mention reimbursement/screening context).
    
    [Suggested Plan / Clinical Pearls Array Requirements]:
    - Do not just list orders. List "Safety Checks" and "Clinical Pearls" that might be missed.
    - Example: "Check Creatinine/eGFR before prescribing NSAIDs."
    - Example: "Consider Colchicine prophylaxis if frequent flares."
    - Example: "Ensure Arthrocentesis if Septic Arthritis is not fully ruled out."
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          differentials: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                condition: { type: Type.STRING },
                likelihood: { type: Type.STRING, enum: ["High", "Moderate", "Low"] },
                reasoning: { type: Type.STRING },
                keyTests: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["condition", "likelihood", "reasoning", "keyTests"],
            },
          },
          consultNote: { type: Type.STRING, description: "A full SOAP note text block with clear line breaks between sections" },
          suggestedPlan: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of safety checks and clinical pearls" },
        },
        required: ["differentials", "consultNote", "suggestedPlan"],
      },
    },
  });

  const jsonText = response.text || "{}";
  try {
    return JSON.parse(jsonText) as ConsultResponse;
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("Failed to generate assessment.");
  }
};