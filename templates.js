/*
  HEARTLAND TEMPLATES: edit this file to add, change, or remove templates.
  No other file needs to change.

  Each template:  { title: "Name shown on the card", text: "Message text" }
  Anything in [square brackets] automatically becomes a fill-in field.
  Fields left blank keep their [bracket] text when copied.
  Reusing the same [Label] twice in one template fills both spots at once.
*/
const TEMPLATE_DATA = [
  {
    category: "Patient SMS",
    templates: [
      {
        title: "Heartland Scheduling SMS Prompt",
        text: "Message from Heartland Cardiology, you've been scheduled for a new patient appointment with [Dr. Name] on [Date & Time] at our [Location] location. Call us at (316) 686-5300, option 1 to reschedule."
      }
    ]
  },
  {
    category: "Referral & Scheduling TEs",
    templates: [
      {
        title: "Referred-To Specific Provider Special Case TE",
        text: "Please schedule this patient. Referred to [Rendering Provider] for [Diagnosis]. They are [Special Category]. Documents have been uploaded to patient chart."
      },
      {
        title: "No Referred-To Provider Special Case TE",
        text: "Please schedule this patient. Referred to first available provider for [Diagnosis]. They are [Special Category]. Documents have been uploaded to patient chart."
      },
      {
        title: "Incoming Referral Notice: Pt Scheduled Already Within 3 Months",
        text: "Be advised of incoming referral from [Referring Provider Last Name] for [Diagnosis]. Patient is currently scheduled for [Appointment Reason] with [Provider] on [Date/Time]. Documents have been uploaded to patient chart."
      },
      {
        title: "Rendering Provider Conflict Action",
        text: "Please call the patient to confirm whether they are looking to switch providers. Referred to Dr. [Referring Provider] but previously saw Dr. [Previous Provider] on [Date]. If so, please schedule. Documents have already been added to the patient's chart."
      }
    ]
  },
  {
    category: "Priority",
    templates: [
      {
        title: "High Priority - No Availability TE",
        text: "Please urgently schedule this patient. Referred to [Dr. Name] for [Diagnosis]. There is no availability within 5 business days. Documents have been uploaded to the patient's chart."
      },
      {
        title: "Scheduled Patient Within 48-72 Hrs TE",
        text: "Patient is scheduled for a high priority appointment with Dr. [Provider] for [Diagnosis] on [Date + Time + Clinic] location. Please prep patient chart."
      }
    ]
  },
  {
    category: "Procedures & Imaging",
    templates: [
      {
        title: "Imaging TE",
        text: "Please schedule this patient. Referred to [Rendering Provider] for [Specify Imaging Type], [Diagnosis]."
      },
      {
        title: "Cardiac Clearance Established Patient TE",
        text: "Please schedule this patient. Referred to [Rendering Provider] for Cardiac Clearance. They are an established patient."
      },
      {
        title: "Gedela TAVR TE",
        text: "Please schedule this patient. Referred to Dr. Gedela for TAVR, [Diagnosis]."
      },
      {
        title: "Gedela Mitral/Triclip/Watchman/LAOO",
        text: "Please schedule this patient. Referred to Dr. Gedela for [Requested Procedure Type]."
      }
    ]
  },
  {
    category: "Insurance & Contact Issues",
    templates: [
      {
        title: "Missing Phone Number TE",
        text: "Please schedule this patient. Referred to [Rendering Provider] for [Diagnosis]. Patient is missing phone number."
      },
      {
        title: "Missing Insurance TE",
        text: "Please schedule this patient. Referred to [Rendering Provider] for [Diagnosis]. They are missing insurance."
      },
      {
        title: "Unsure/Denied Insurance TE",
        text: "Please schedule this patient. Referred to [Rendering Provider] for [Diagnosis]. Patient insurance is ineligible."
      }
    ]
  },
  {
    category: "Special Patient Cases",
    templates: [
      {
        title: "Requires Translation (Non-English Speaking) TE",
        text: "Please schedule this patient. Referred to [Rendering Provider] for [Diagnosis]. They are [Language]-speaking."
      },
      {
        title: "Inmate TE",
        text: "Please schedule this patient. Referred to [Rendering Provider] for [Diagnosis]. Patient is an inmate."
      },
      {
        title: "St. Luke's Transplant TE",
        text: "Please schedule this patient. Referred to [Rendering Provider] for [Diagnosis]. Patient is a transplant candidate."
      },
      {
        title: "Pediatric (<18 yrs old) TE",
        text: "Please schedule this patient. Referred to [Rendering Provider] for [Diagnosis]. Patient is a minor."
      },
      {
        title: "Telemed Request TE",
        text: "Please schedule this patient. Referred to [Rendering Provider] for [Diagnosis]. Patient is requesting a Telemed appointment."
      }
    ]
  }
];

if (typeof module !== "undefined") module.exports = TEMPLATE_DATA;
