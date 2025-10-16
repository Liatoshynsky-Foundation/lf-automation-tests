import { test as baseTest, expect as baseExpect } from './fixtureBase';
import { AboutUsPage } from '../page/client/AboutUsPage';
import {ArchiveCabinetPage} from "../page/client/ArchiveCabinetPage";

type MyFixturesPage = {
  aboutUsPage: AboutUsPage;
  archiveCabinetPage: ArchiveCabinetPage;
};

export const test = baseTest.extend<MyFixturesPage>({
  aboutUsPage: async ({ page }, use) => {
    const aboutUs = new AboutUsPage(page);
    await use(aboutUs);
  },
  archiveCabinetPage: async ({ page }, use) => {
    const archiveCabinet = new ArchiveCabinetPage(page);
    await use(archiveCabinet);
  }

});

export const expect = baseExpect;

