// function to detect conflits and change status
// Force it to keep the current session
// Possible state values:

export enum STATES {
    CONFLICT = 'CONFLICT',
    CONNECTED = 'CONNECTED',
    DEPRECATED_VERSION = 'DEPRECATED_VERSION',
    OPENING = 'OPENING',
    PAIRING = 'PAIRING',
    PROXYBLOCK = 'PROXYBLOCK',
    SMB_TOS_BLOCK = 'SMB_TOS_BLOCK',
    TIMEOUT = 'TIMEOUT',
    TOS_BLOCK = 'TOS_BLOCK',
    UNLAUNCHED = 'UNLAUNCHED',
    UNPAIRED = 'UNPAIRED',
    UNPAIRED_IDLE = 'UNPAIRED_IDLE',
}

export const onStateChange = ((client: any, state: STATES) => {
    console.log('State changed: ', state);
    // force whatsapp take over
    if (STATES.CONFLICT.includes(state)) client.useHere();
    // detect disconnect on whatsapp
    if (STATES.UNPAIRED.includes(state)) console.log('***-> TODO: logout');
  });

export default onStateChange;