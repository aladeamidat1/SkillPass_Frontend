import {
    SuiClient,
    getFullnodeUrl,
    TransactionBlock,
} from "@mysten/sui/client";

// ✅ Initialize client
export const client = new SuiClient({
    url: getFullnodeUrl("testnet"), // change to "mainnet" when live
});

// Replace with your deployed packageId
const PACKAGE_ID = "0xYOUR_PACKAGE_ID";
const REGISTRY_ID = "0xYOUR_REGISTRY_OBJECT_ID"; // your CertificateRegistry object ID

// ---------------------- UNIVERSITY FUNCTIONS ---------------------- //

// Mint basic certificate
export async function mintCertificate(
    signer: any,
    studentAddress: string,
    credentialType: string,
    grade?: string
) {
    const tx = new TransactionBlock();
    tx.moveCall({
        target: `${PACKAGE_ID}::certificate_registry::mint_certificate`,
        arguments: [
            tx.object(REGISTRY_ID),
            tx.pure(studentAddress),
            tx.pure(Array.from(new TextEncoder().encode(credentialType))),
            grade ? tx.pure(Array.from(new TextEncoder().encode(grade))) : tx.pure(null),
            tx.object("0x6"), // Sui Clock object
        ],
    });

    return await client.signAndExecuteTransactionBlock({
        signer,
        transactionBlock: tx,
        options: { showEffects: true },
    });
}

// Mint with evidence (Walrus blob)
export async function mintWithEvidence(
    signer: any,
    studentAddress: string,
    credentialType: string,
    evidenceBlobId: string,
    grade?: string
) {
    const tx = new TransactionBlock();
    tx.moveCall({
        target: `${PACKAGE_ID}::certificate_registry::mint_with_evidence`,
        arguments: [
            tx.object(REGISTRY_ID),
            tx.pure(studentAddress),
            tx.pure(Array.from(new TextEncoder().encode(credentialType))),
            tx.pure(Array.from(new TextEncoder().encode(evidenceBlobId))),
            grade ? tx.pure(Array.from(new TextEncoder().encode(grade))) : tx.pure(null),
            tx.object("0x6"), // Clock
        ],
    });

    return await client.signAndExecuteTransactionBlock({
        signer,
        transactionBlock: tx,
        options: { showEffects: true },
    });
}

// Revoke certificate
export async function revokeCertificate(
    signer: any,
    certificateId: string,
    reason: string
) {
    const tx = new TransactionBlock();
    tx.moveCall({
        target: `${PACKAGE_ID}::certificate_registry::revoke_certificate`,
        arguments: [
            tx.object(certificateId),
            tx.pure(Array.from(new TextEncoder().encode(reason))),
        ],
    });

    return await client.signAndExecuteTransactionBlock({
        signer,
        transactionBlock: tx,
        options: { showEffects: true },
    });
}

// Update certificate grade
export async function updateCertificateGrade(
    signer: any,
    certificateId: string,
    newGrade?: string
) {
    const tx = new TransactionBlock();
    tx.moveCall({
        target: `${PACKAGE_ID}::certificate_registry::update_certificate_grade`,
        arguments: [
            tx.object(certificateId),
            newGrade ? tx.pure(Array.from(new TextEncoder().encode(newGrade))) : tx.pure(null),
        ],
    });

    return await client.signAndExecuteTransactionBlock({
        signer,
        transactionBlock: tx,
        options: { showEffects: true },
    });
}

// Add evidence to existing certificate
export async function addEvidenceToCertificate(
    signer: any,
    certificateId: string,
    evidenceBlobId: string
) {
    const tx = new TransactionBlock();
    tx.moveCall({
        target: `${PACKAGE_ID}::certificate_registry::add_evidence_to_certificate`,
        arguments: [
            tx.object(certificateId),
            tx.pure(Array.from(new TextEncoder().encode(evidenceBlobId))),
        ],
    });

    return await client.signAndExecuteTransactionBlock({
        signer,
        transactionBlock: tx,
        options: { showEffects: true },
    });
}

// ---------------------- EMPLOYER / STUDENT FUNCTIONS ---------------------- //

// Verify certificate (read info)
export async function getCertificateInfo(certificateId: string) {
    return await client.getObject({
        id: certificateId,
        options: { showContent: true },
    });
}
