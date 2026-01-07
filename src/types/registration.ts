export type TeamSize = 2 | 3 | 4;

export interface MemberDetails {
    fullName: string;
    email: string;
    mobile: string;
    city: string;
    state: string;
    qualification: string;
    branch: string;
    college: string;
    enrollment: string;
    isStudent: "Yes" | "No";
    year?: string;
}

export interface RegistrationData {
    // Step 1
    teamName: string;
    teamSize: TeamSize;

    // Step 2 & 3
    leader: MemberDetails;
    members: MemberDetails[]; // Array of member 2, 3, 4

    // Step 4
    hackathonHistory: {
        participatedBefore: "Yes" | "No";
        participatedHWI: "Yes" | "No";
        hwiEventName?: string;
    };

    // Step 5
    declaration: {
        detailsCorrect: boolean;
        feeAcknowledged: boolean;
        nonRefundable: boolean;
        rulesAccepted: boolean;
    };

    // Payment State
    paymentStatus: "pending" | "paid" | "failed";
    amount: number;
}
