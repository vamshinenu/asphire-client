export enum Role {
    INT_ADMIN = 'INT_ADMIN',
    INT_USER = 'INT_USER',
    INT_CANDIDATE = 'INT_CANDIDATE',
    EXT_USER = 'EXT_USER',
    EXT_CANDIDATE = 'EXT_CANDIDATE',
    EXT_ADMIN = 'EXT_ADMIN',

}

export interface Item {
    value: string;
    label: string;
}


export default function getRoleOptions(role: Role) {

    let options: Item[] = [];

    switch (role) {
        case Role.INT_ADMIN:
            options =
                [
                    { value: 'INT_ADMIN', label: 'Internal Admin' },
                    { value: 'INT_USER', label: 'Internal User' },
                    { value: 'INT_CANDIDATE', label: 'Internal Candidate' },
                    { value: 'EXT_USER', label: 'External User' },
                    { value: 'EXT_CANDIDATE', label: 'External Candidate' },
                    { value: 'EXT_ADMIN', label: 'External Admin' },
                ];

            break;
        case Role.INT_USER:
            options =
                [
                    { value: 'INT_CANDIDATE', label: 'Internal Candidate' },
                    { value: 'EXT_CANIDATE', label: 'External Candidate' },
                ];
            break;
        case Role.INT_CANDIDATE:
            break;
        case Role.EXT_USER:
            options =
                [
                    { value: 'EXT_CANIDATE_EDU', label: 'Candidate' },
                ];
            break
        case Role.EXT_CANDIDATE:
            break;
        case Role.EXT_ADMIN:
            options =
                [
                    { value: 'EXT_USER_EDU', label: 'User' },
                    { value: 'EXT_CANDIDATE_EDU', label: 'Candidate' },
                ];
            break;
        default:
            options = [];
            break;
    }

    return options;
}