import {expect as baseExpect, test as baseTest} from './fixtureBase';
import {AboutUsPage} from '../page/client/AboutUsPage';
import {ArchiveCabinetPage} from "../page/client/ArchiveCabinetPage";
import {ArtistryPage} from '../page/client/ArtistryPage';
import {SupportUsPage} from '../page/client/SupportUsPage';
import {ContactsPage} from '../page/client/ContactsPage';
import {PrivacyPolicyPage} from '../page/client/PrivacyPolicyPage';
import {AdminLoginPage} from '../page/admin/AdminLoginPage';
import {AdminDashboardPage} from '../page/admin/AdminDashboardPage';
import {ResearchAndAcademicWorksPage} from "../page/client/ResearchAndAcademicWorksPage";
import {MediaPage} from '../page/client/MediaPage';
import {TermsPage} from '../page/client/TermsPage';


type MyFixturesPage = {
    aboutUsPage: AboutUsPage;
    artistryPage: ArtistryPage;
    archiveCabinetPage: ArchiveCabinetPage;
    supportUsPage: SupportUsPage;
    contactsPage: ContactsPage;
    adminLoginPage: AdminLoginPage;
    adminDashboardPage: AdminDashboardPage;
    researchAndAcademicWorksPage: ResearchAndAcademicWorksPage;
    privacyPolicyPage: PrivacyPolicyPage;
    termsPage: TermsPage;
    mediaPage: MediaPage;

};

export const test = baseTest.extend<MyFixturesPage>({
    aboutUsPage: async ({page}, use) => {
        const aboutUs = new AboutUsPage(page);
        await use(aboutUs);
    },
    archiveCabinetPage: async ({page}, use) => {
        const archiveCabinet = new ArchiveCabinetPage(page);
        await use(archiveCabinet);
    },
    artistryPage: async ({page}, use) => {
        const artistryPage = new ArtistryPage(page);
        await use(artistryPage);
    },
    supportUsPage: async ({page}, use) => {
        const supportUsPage = new SupportUsPage(page);
        await use(supportUsPage);
    },
    contactsPage: async ({page}, use) => {
        const contactsPage = new ContactsPage(page);
        await use(contactsPage);
    },
    privacyPolicyPage: async ({page}, use) => {
        const privacyPolicyPage = new PrivacyPolicyPage(page);
        await use(privacyPolicyPage);
    },
    adminLoginPage: async ({page}, use) => {
        const adminLoginPage = new AdminLoginPage(page);
        await use(adminLoginPage);
    },
    adminDashboardPage: async ({page}, use) => {
        const adminDashboardPage = new AdminDashboardPage(page);
        await use(adminDashboardPage);
    },
    researchAndAcademicWorksPage: async ({page}, use) => {
        const researchAndAcademicWorksPage = new ResearchAndAcademicWorksPage(page);
        await use(researchAndAcademicWorksPage);
    },
    termsPage: async ({page}, use) => {
        const termsPage = new TermsPage(page);
        await use(termsPage);
    },
    mediaPage: async ({page}, use) => {
        const mediaPage = new MediaPage(page);
        await use(mediaPage);
    }
});

export const expect = baseExpect;

