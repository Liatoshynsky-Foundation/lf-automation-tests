import { test as baseTest, expect as baseExpect } from './fixtureBase';
import { AboutUsPage } from '../page/client/AboutUsPage';
import {ArchiveCabinetPage} from "../page/client/ArchiveCabinetPage";
import { ArtistryPage } from '../page/client/ArtistryPage';

type MyFixturesPage = {
  aboutUsPage: AboutUsPage;
  artistryPage: ArtistryPage;
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
  },
  artistryPage: async ({ page }, use) => {
    const artistryPage = new ArtistryPage(page);
    await use(artistryPage);
  }

});

export const expect = baseExpect;

