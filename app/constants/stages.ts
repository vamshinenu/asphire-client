export interface Stage {
    stage: string;
    name: string;
    actor: string;
    description: string;
    payment: boolean;
    subStage: SubStage[];
}

const misc = {
    name: 'misc',
    description: 'Miscellaneous',
    payment: false,
}

export interface SubStage {
    name: string;
    description: string;
    payment: boolean;
}

export const stages = [
    {
        stage: '1',
        name: 'Document Collection',
        actor: 'EXTERNAL',
        description:
            'This stage involves collecting important documents that are required for the application process. These documents may include proof of English proficiency, Statement of Purpose (SOP), Letters of Recommendation (LOR), educational documents, experience letter (optional), and a valid passport. Please upload the documents below.',
        payment: false,
        subStage: [
            {
                name: 'English Test',
                description: 'Provide proof of English proficiency',
                payment: false,
            },
            {
                name: 'SOP',
                description: 'Write Statement of Purpose',
                payment: false,
            },
            {
                name: 'LOR',
                description: 'Obtain three Letters of Recommendation',
                payment: false,
            },
            {
                name: 'Experience Letter',
                description: 'Optional: Provide Experience Letter',
                payment: false,
            },
            {
                name: 'Educational Documents',
                description: 'Provide all Educational Documents until the latest qualification',
                payment: false,
            },
            {
                name: 'Passport',
                description: 'Provide a valid Passport',
                payment: false,
            },
        ],
    },
    {
        stage: '2',
        name: 'Application Form',
        actor: 'INTERNAL',
        description: 'We are Filling out the necessary application forms for the desired program or institution for you',
        payment: false,
        subStage: [
            misc
        ],
    },
    {
        stage: '3',
        name: 'Bank Statements for I20',
        actor: 'INTERNAL',
        description:
            'Provide bank statements as required for the I20 form. There may be options to provide the statements with or without an affidavit.',
        payment: false,
        subStage: [
            {
                name: 'Bank Statements',
                description: 'Provide Bank statements',
                payment: false,
            },
        ],
    },
    {
        stage: '4',
        name: 'Waiting for I20',
        actor: 'INTERNAL',
        description: 'Your application is now being processed. Please wait for the I20 document to be issued, Please check your email regularly.',
        payment: false,
        subStage: [
            {
                name: 'I20',
                description: 'Upload I20 document',
                payment: false,
            },
        ],
    },
    {
        stage: '5',
        name: 'CGI Portal Fees',
        actor: 'INTERNAL',
        description: 'We pay the VISA application fees through the CGI portal. Please Make Payment as soon as possible.',
        payment: true,
        subStage: [misc],
    },
    {
        stage: '6',
        name: 'VISA Slot Booking',
        actor: 'INTERNAL',
        description: 'We will book a suitable VISA slot for the VISA interview as soon as possible.',
        payment: true,
        subStage: [misc],
    }, {
        stage: '7',
        name: 'SEVIS Fee Payment',
        actor: 'INTERNAL',
        description: 'Pay the SEVIS fee as required for the VISA process. which is mandatory part of the VISA application process.',
        payment: true,
        price: 350,
        subStage: [misc],
    },
    {
        stage: '8',
        name: 'Fill out DS 160 Form',
        actor: 'INTERNAL',
        description: 'We are filling out the essential DS 160 form, which is a mandatory part of the VISA application process.',
        payment: false,
        subStage: [misc],
    },
    {
        stage: '9',
        name: 'Loan and Savings Documents',
        actor: 'INTERNAL',
        description:
            'Prepare and provide necessary loan and savings documents. Additionally, there may be an option to provide Chartered Accountant (CA) or Cost Accountant (CE) reports (optional).',
        payment: true,
        subStage: [
            {
                name: 'Loan Documents and Savings Documents',
                description: 'Provide Loan Documents and Savings Documents',
                payment: true,
            },
            {
                name: 'CA / CE Reports',
                description: 'Optional: Provide CA / CE Reports',
                payment: true,
            },
        ],
    },
    {
        stage: '10',
        name: 'Mock Interview',
        actor: 'INTERNAL',
        description:
            'Participate in a mock interview session to prepare for the actual VISA interview. This helps improve interview skills and boosts confidence.',
        payment: false,
        subStage: [misc],
    },
    {
        stage: '11',
        name: 'VISA Interview',
        actor: 'INTERNAL',
        description: 'Attend the VISA interview at the designated consulate or embassy. Please carry all the necessary documents.',
        payment: false,
        subStage: [misc],
        checkList: [
            {
                name: 'Documents',
            }
        ]
    },
    {
        stage: '12',
        name: 'Preparing to Travel',
        actor: 'INTERNAL',
        description:
            'Make necessary preparations for your travel, including booking flight tickets, arranging for shopping needs, gathering required medical reports, creating a Zolve account, and optionally arranging for housing.',
        payment: false,
        subStage: [],
        checkList: [
            {
                name: 'Flight Tickets',
                description: 'Book Flight Tickets, consult us for the best deals and details on the travel planning',
            },
            {
                name: 'Shopping',
                description: 'Arrange for shopping needs, cloths, electronics, etc.',
            },
            {
                name: 'Medical Reports',
                description: 'Gather required medical reports',
            },
            {
                name: 'Zolve Account',
                description: 'Create a Zolve account credit card',
            },
            {
                name: 'Housing',
                description: 'Optional: Arrange for housing',
            },
        ]
    },
    {
        stage: '13',
        name: 'Immigration Documents',
        actor: 'INTERNAL',
        description: 'Provide necessary savings documents for immigration purposes.',
        payment: false,
        subStage: [

        ],
        checkList: [
            {
                name: 'Savings Documents',
            },
            {
                name: 'CA / CE Reports',
            },
        ]
    },
];

