export const Tag = {
    MANUAL: '@MANUAL',
    CYBORG: '@CYBORG',
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