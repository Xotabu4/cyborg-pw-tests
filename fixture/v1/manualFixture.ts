import { Page, test } from "@playwright/test";

export const manualTest = test.extend<{
  controlPanelPage: Page;
  manualStep: (stepName: string) => Promise<void>;
}>({
  controlPanelPage: [
    async ({ browser }, use) => {
      const controlPanelContext = await browser.newContext();
      const popupOpener = await controlPanelContext.newPage();
      const promPopupOpen = controlPanelContext.waitForEvent("page");
      await popupOpener.evaluate(
        `window.open("about:blank","TestControlPanel","resizable=false,toolbar=false,scrollbars=false,menubar=false,status=false,directories=false,width=300,height=300,left=10,top=300");`
      );
      await popupOpener.close();
      const controlPanelPage = await promPopupOpen;
      await controlPanelPage.evaluate(
        function (opts) {
          setTimeout(() => {
            const overlayDiv = document.createElement("div");

            const testNameElement = document.createElement("div");
            testNameElement.textContent = opts.testName;

            const stepNameElement = document.createElement("div");
            stepNameElement.id = "PW_stepNameId";
            stepNameElement.textContent = "";

            const buttonNextStepElement = document.createElement("button");
            buttonNextStepElement.textContent = "Next Step";
            buttonNextStepElement.onclick = function () {
              // @ts-expect-error
              playwright.resume();
            };

            const inputElement = document.createElement("input");
            inputElement.placeholder = "Reason for failure";
            inputElement.id = "PW_reasonInputId";

            const buttonFailTestElement = document.createElement("button");
            buttonFailTestElement.textContent = "Fail test";
            buttonFailTestElement.onclick = function () {
              // @ts-expect-error
              window.PW_setTestAsFailed(
                document.getElementById("PW_reasonInputId").value
              );
              // @ts-expect-error
              window.PW_stepFailed =
                document.getElementById("PW_reasonInputId").value;
            };

            overlayDiv.appendChild(testNameElement);
            overlayDiv.appendChild(stepNameElement);
            overlayDiv.appendChild(buttonNextStepElement);
            overlayDiv.appendChild(inputElement);
            overlayDiv.appendChild(buttonFailTestElement);

            document.body.appendChild(overlayDiv);
          }, 1000);
        },
        { testName: test.info().titlePath.join(" ") }
      );
      await controlPanelPage.exposeFunction(
        "PW_setTestAsFailed",
        async (reason: string) => {
          await controlPanelPage.evaluate(`playwright.resume();`);
        }
      );

      await use(controlPanelPage);

      await controlPanelPage.close();
      await controlPanelContext.close();
    },
    { auto: false },
  ],
  manualStep: [
    async ({ page, browser, context, controlPanelPage }, use) => {
      await use(
        async (stepName) =>
          await test.step(
            stepName,
            async () => {
              // TODO: Fix test name
              await controlPanelPage.evaluate((_stepName) => {
                // @ts-expect-error
                document.querySelector("#PW_stepNameId").textContent = _stepName;
              }, stepName);
              // TODO: Find way keep correct trace that has step name
              await controlPanelPage.pause();
              const shouldFailStep = await controlPanelPage.evaluate(
                `window.PW_stepFailed`
              );
              if (shouldFailStep) {
                throw new Error(shouldFailStep as string);
              }
            },
            { box: true }
          )
      );
    },
    { auto: false },
  ],
});
