import {test} from '@playwright/test'

export const skipIfManual = () => {
    test.skip(() => test.info().project.name === 'manual');
}