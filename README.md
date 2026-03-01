# Exposome Radar 🌍🧬

**Cancer Genomics Intersection Engine**  
*Built for the 2026 Bioethics & Bioinformatics Hackathon*

---

## 🚀 The Problem

For decades, cancer risk assessment has focused disproportionately on **Genomics** (what mutations you were born with). However, this ignores the **Exposome**—the total sum of environmental toxins in the air we breathe, the water we drink, and the soil we walk on. 

A high level of ambient Radon gas or heavy metal pollution might just cause inflammation in a healthy person, but it can be **lethal** for an individual with an inherited genomic vulnerability (e.g., a *BRCA1* or *TP53* mutation). 

**Exposome Radar** is the first application to dynamically intersect geographic environmental data with specific patient genetic profiles to generate highly personalized, actionable clinical advice.

---

## ✨ Key Features

### 🗺️ Interactive Environmental Mapping
An intuitive, live map of the United States. Clinicians or patients can select their geographic region to instantly pull live environmental toxicity levels—including **Radon gas**, **PM2.5 particulate pollution**, and **Heavy Metals** (e.g., Lead/Arsenic).

### 🧬 Dynamic Genomic Patient Profiles
Select a baseline patient persona (e.g., Healthy, `BRCA1+`, `TP53 Germline Carrier`, or `EGFR Exon 19 Deletion`). The intersection engine recalculates the geographic risk dynamically based on how the selected mutation reacts to the specific local toxins present. 

For example:
- **Radon** causes double-strand DNA breaks that **TP53** carriers cannot efficiently repair.
- **PM2.5** causes immense oxidative stress that accelerates **EGFR** lung mutations.
- **Heavy Metals** acutely inhibit the backup DNA repair pathways that **BRCA1/2** patients rely on.

### 🩺 Automated Clinical Action Plans
The platform translates this complex, multi-omics data into simple, actionable Clinical Action Plans. It recommends specific tests (like Heavy Metal Toxicity Panels or Low-Dose CT scans) and immediate preventative measures based on the EPA's thresholds.

### ⚖️ Environmental Justice (EJ) Mode
Healthcare is socio-economic. By activating the **Environmental Justice (EJ)** toggle, the platform shifts its Action Plans to acknowledge systemic realities (such as redlining or industrial zoning near vulnerable communities). 

Instead of recommending expensive, out-of-pocket mitigations, EJ Mode dynamically recalibrates to offer:
- 🏛️ Subsidized municipal and state clinics
- 💵 Federal grant links for radon mitigation or HEPA filtration
- ⚖️ Connects users to Free Legal Aid for tenant or civil rights violations

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (React), TailwindCSS, Recharts, React-Simple-Maps
- **Backend:** FastAPI (Python), Uvicorn
- **Engine Core:** High-performance Genomic C++ Parser (`vcf_filter.cpp`)

---

## 🏃‍♂️ How to Run the App Locally

The repository includes a convenient startup script that launches both the frontend and backend concurrently.

**Prerequisites:**
- Python 3.9+ 
- Node.js (v18+)

**1. Clone the repository**
```bash
git clone https://github.com/your-username/exposome-radar.git
cd exposome-radar
```

**2. Setup Backend Python Environment**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
cd ..
```

**3. Install Frontend Dependencies**
```bash
cd frontend
npm install
cd ..
```

**4. Start the Application**
From the root of the project, run:
```bash
python run.py
```
> The FastAPI backend will run on `http://localhost:8000`  
> The Next.js frontend will run on `http://localhost:3000`

---

### *A New Paradigm for Preventative Oncology & Environmental Rights.*
