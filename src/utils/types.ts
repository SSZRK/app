export type User = {
    id?: string;
    email?: string;
    username?: string;
    role?: string;
    verificationField1?: string;
    verificationField2?: string;
    createdAt?: number;
}

export type Project = {
    id: string;
    name: string;
}

export type AdminOutletContextType = {
    jwt?: string;
}

export type DocumentEditorFile = {
    type?: string;
    pages?: Array<DocumentEditorPage>;
}

export type DocumentEditorPage = {
    type?: string;
    index: number;
    data?: any;
}