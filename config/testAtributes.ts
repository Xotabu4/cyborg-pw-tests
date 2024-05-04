export const Tag = {
    MANUAL: '@MANUAL',
    CYBORG: '@CYBORG',
    AI: '@AI',
    AUTOMATED: '@AUTOMATED',
};

export const Owner = {
    okhotemskyi: '@okhotemskyi',
    billHerrington: '@billHerrington',
}

export const description = (description: string) => ({
    type: 'description',
    description
})

export const severity = (severity: 'CRITICAL' | 'HIGH' | 'MEDUIM' | 'LOW') => ({
    type: 'severity',
    severity
})