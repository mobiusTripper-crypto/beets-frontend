import { Interface } from '@ethersproject/abi';
import ReaperWrappingAbi from '~/lib/abi/ReaperWrapping.json';
import {
    EncodeWrapReaperVaultTokenInput,
    EncodeUnwrapReaperVaultTokenInput,
} from '~/lib/services/batch-relayer/relayer-types';

export class ReaperWrappingService {
    public encodeWrap(params: EncodeWrapReaperVaultTokenInput): string {
        const reaperWrappingLibrary = new Interface(ReaperWrappingAbi);

        return reaperWrappingLibrary.encodeFunctionData('wrapReaperVaultToken', [
            params.vaultToken,
            params.sender,
            params.recipient,
            params.amount,
            params.outputReference,
        ]);
    }

    public encodeUnwrap(params: EncodeUnwrapReaperVaultTokenInput): string {
        const reaperWrappingLibrary = new Interface(ReaperWrappingAbi);

        return reaperWrappingLibrary.encodeFunctionData('unwrapReaperVaultToken', [
            params.vaultToken,
            params.sender,
            params.recipient,
            params.amount,
            params.outputReference,
        ]);
    }
}
