import { test as baseTest, expect as baseExpect } from './fixtureBase';
import { AboutUsPage } from '../page/client/AboutUsPage';
import {ArchiveCabinetPage} from "../page/client/ArchiveCabinetPage";
import { ArtistryPage } from '../page/client/ArtistryPage';
import { SupportUsPage } from '../page/client/SupportUsPage';
import { ContactsPage } from '../page/client/ContactsPage';

type MyFixturesPage = {
  aboutUsPage: AboutUsPage;
  artistryPage: ArtistryPage;
  archiveCabinetPage: ArchiveCabinetPage;
  supportUsPage: SupportUsPage;
  contactsPage: ContactsPage;
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
  },
  supportUsPage: async ({ page }, use) => {
    const supportUsPage = new SupportUsPage(page);
    await use(supportUsPage);
  },
  contactsPage: async ({ page }, use) => {
    const contactsPage = new ContactsPage(page);
    await use(contactsPage);
  }

});

export const expect = baseExpect;

