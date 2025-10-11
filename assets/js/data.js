export const PrivacyContent = `
    <h4 class="text-lg font-bold text-accent-green mb-2">Privacy Note: Project Focus & Data Security</h4>
    <p class="text-sm text-gray-200 mb-4">
        SurgiMind is a **B.Tech Final Year Project** developed by Mohd Rayyan, Syed Saad Ahmed, and Mohammed Sofiyaan from JNTUH. 
        This platform is purely for **educational and research simulation**.
    </p>
    <h4 class="text-lg font-bold text-accent-green mb-2">1. Data Handling & Anonymization (Simulated)</h4>
    <ul class="list-disc list-inside text-sm text-gray-200 space-y-1">
        <li>**No Real Patient Data:** The application handles simulated, anonymized clinical data (placeholder reports, mock video streams).</li>
        <li>**Data Segregation:** Simulated case files are segregated by surgeon and are not publicly visible.</li>
        <li>**Anonymized Logs:** System metrics (e.g., model usage, processing times) are recorded in anonymized form for performance analysis only.</li>
    </ul>
    <h4 class="text-lg font-bold text-accent-green mb-2 mt-4">2. Security & Access Control (Simulated)</h4>
    <ul class="list-disc list-inside text-sm text-gray-200 space-y-1">
        <li>**Encryption:** All data fields in our mock environment are secured using industry-standard simulation of **end-to-end encryption** and storage.</li>
        <li>**Surgeon-Only Access:** Authentication is simulated to ensure only authorized users (surgeons) access the platform. Access tokens are simulated to expire periodically.</li>
    </ul>
    <h4 class="text-lg font-bold text-accent-green mb-2 mt-4">3. Data Usage & Commercial Policy</h4>
    <ul class="list-disc list-inside text-sm text-gray-200 space-y-1">
        <li>**Research Only:** Data generated within the platform is solely for academic purposes (JNTUH B.Tech Project).</li>
        <li>**No Commercial Use:** Data is **not** shared, sold, or used for any commercial or external third-party applications, strictly adhering to academic integrity.</li>
    </ul>
`;

export const TermsContent = `
    <h4 class="text-lg font-bold text-accent-green mb-2">Terms of Service: Academic Use & Liability</h4>
    <p class="text-sm text-gray-200 mb-4">
        By accessing this platform, you acknowledge the following terms which govern its use:
    </p>
    <h4 class="text-lg font-bold text-accent-green mb-2">1. Non-Clinical Warning & Liability</h4>
    <ul class="list-disc list-inside text-sm text-gray-200 space-y-1">
        <li>**Non-Clinical Use:** SurgiMind must **NEVER** be used for actual diagnosis, patient treatment, or real surgical guidance. It is a research prototype.</li>
        <li>**No Medical Advice:** The summaries, checklists, and procedural confidence scores provided are for **simulation/educational reference only** and should not replace professional medical judgment.</li>
        <li>**Liability Waiver:** The project creators (Mohd Rayyan, Syed Saad Ahmed, Mohammed Sofiyaan) and JNTUH hold **no liability** for any clinical decisions made based on the platform's simulated outputs.</li>
        </ul>
    <h4 class="text-lg font-bold text-accent-green mb-2 mt-4">2. Software and Model Limitations</h4>
    <ul class="list-disc list-inside text-sm text-gray-200 space-y-1">
        <li>**Prototype Status:** The application is provided "as is" with known limitations and bugs typical of final year academic projects.</li>
        <li>**Simulated Accuracy:** The reported AI model accuracies (e.g., 94.8%) are simulated for demonstration purposes.</li>
        <li>**Compliance:** This application does **not** comply with real-world HIPAA, GDPR, or FDA regulations, as it is non-operational academic software.</li>
    </ul>
    <h4 class="text-lg font-bold text-accent-green mb-2 mt-4">3. User Conduct</h4>
    <ul class="list-disc list-inside text-sm text-gray-200 space-y-1">
        <li>**Authorized Use:** This platform is intended strictly for authorized surgical personnel involved in the associated academic study.</li>
        <li>**Misuse Prohibited:** Users must not attempt to upload real patient identifiable information or attempt to exploit the platform's simulated security features.</li>
    </ul>
`;

export const features = [
    { id: 'report', title: 'Report Detection & Summarization', subtitle: 'Extracts and synthesizes clinical data',
      description: 'Leverages NLP models to ingest medical reports (PDF/DICOM), extracting key findings, generating concise summaries, and recommending surgical procedures and checklists with high confidence scores.',
      img: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVwb3J0JTIwYW5hbHlzaXN8ZW58MHx8MHx8fDA%3D'
    },
    { id: 'tool', title: 'Real-Time Tool Detection', subtitle: 'Live visual intelligence in the operating room',
      description: 'Uses cutting-edge computer vision to provide live detection of surgical instruments via a camera feed. It applies bounding boxes, confidence scores, and maintains a real-time event log of tool usage.',
      img: 'https://images.unsplash.com/photo-1725409796886-850f46d1d0cb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VyZ2ljYWwlMjB0b29sc3xlbnwwfHwwfHx8MA%3D%3D'
    },
    { id: 'workflow', title: 'Procedural Workflow Analysis', subtitle: 'Mapping efficiency and procedural compliance',
      description: 'Analyzes recorded sessions to map procedural steps, identify surgical phases, and pinpoint bottlenecks. The final outcome includes a detailed, auditable timeline and procedure validation checks.',
      img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29ya2Zsb3d8ZW58MHx8MHx8fDA%3D'
    }
];

export function getReportAnalysis(procedure) {
    if (procedure === 'Heart Surgery' || procedure === 'Aortic Valve Replacement') {
        return {
            summary: "This report details a high-risk Coronary Artery Bypass Graft (CABG) procedure due to multi-vessel disease. Key findings include severe stenosis in the LAD and L-CX arteries. The suggested tools reflect the complexity and precision required for vascular suturing and clamping.",
            findings: [
                "Severe stenosis (85%) in Left Anterior Descending (LAD) artery.",
                "Left Ventricular Ejection Fraction (LVEF) is 45%.",
                "Patient has a history of controlled hypertension, but no prior cardiac events.",
            ],
            tools: [
                { name: "Rib Spreader (Finochietto)", icon: "🦴", type: "Required" },
                { name: "Coronary Scissor (Potts-Smith)", icon: "✂️", type: "Required" },
                { name: "Vascular Clamps (Bulldog)", icon: "📎", type: "Required" },
                { name: "Sutures (6-0 Prolene)", icon: "🧵", type: "Required" },
                { name: "DeBakey Forceps", icon: "🥢", type: "Optional" },
            ]
        };
    } else {
        return {
            summary: "Patient reports indicate a complex Cholecystitis case requiring a planned laparoscopic Cholecystectomy. Key concerns include significant inflammation and potential minor biliary duct involvement, requiring meticulous dissection.",
            findings: [
                "Elevated WBC count (14.5 K/μL) consistent with acute inflammation.",
                "Ultrasound confirms gall bladder wall thickening (>5mm).",
                "No evidence of common bile duct (CBD) stone obstruction on MRI.",
            ],
            tools: [
                { name: "Scalpel (#10)", icon: "🔪", type: "Required" },
                { name: "Laparoscopic Graspers", icon: "🍴", type: "Required" },
                { name: "Harmonic Scalpel", icon: "⚡", type: "Required" },
                { name: "Sutures (3-0 Vicryl)", icon: "🪡", type: "Optional" },
                { name: "Trocar/Cannula Set", icon: "⚙️", type: "Required" },
            ]
        };
    }
}