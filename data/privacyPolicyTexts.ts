export const privacyPolicySections = {
  uk: {
    dataWeCollect: "Які дані ми збираємо та чому:",
    dataUsage: "Як ми використовуємо ваші дані:",
    cookies: "Які cookie ми використовуємо:",
    googleAuth: "Авторизація через Google-акаунт:",
    socialNetworks: "Соціальні мережі:",
    targetedAds: "Таргетована реклама:",
    newsletter: "Підписка на новини та відмова від розсилки:",
    dataRetention: "Як ми зберігаємо ваші дані:",
    userRights: "Ваші права:",
    contactUs: "Як зв’язатися з нами:",
  },
  en: {
    dataWeCollect: "What Data We Collect and Why:",
    dataUsage: "How we use your data:",
    cookies: "What cookies we use:",
    googleAuth: "Sign in with Google:",
    socialNetworks: "Social Networks:",
    targetedAds: "Targeted Advertising:",
    newsletter: "Newsletter Subscription and Unsubscribing:",
    dataRetention: "How We Store Your Data:",
    userRights: "Your Rights:",
    contactUs: "How to Contact Us:",
  },
};

export const privacyPolicyContent = {
  uk: {
    title: "ПоЛітИкА КонФіДеНційНоСті",
    intro: {
      text1:
        "Ми цінуємо вашу довіру, тому прагнемо захищати вашу приватність та особисту інформацію, яку ви надаєте нам через наш вебсайт.",
      text2:
        "Користуючись нашим сайтом, ви погоджуєтесь з умовами цієї Політики.",
      keywords: ["обробляємо", "гарантуємо"],
    },
    dataWeCollect: {
      intro:
        "Ми збираємо тільки ті дані, які потрібні для надання вам наших послуг і покращення вашого досвіду на сайті.",
      providedData: {
        title: "Дані, які ви нам надаєте:",
        items: ["Ім'я та електронна пошта", "Додаткові дані (за бажанням)"],
      },
      autoCollectedData: {
        title: "Дані, які збираються автоматично:",
        intro:
          "Коли ви відвідуєте наш сайт, ми збираємо певну технічну інформацію, як от:",
        items: [
          "IP-адреса вашого пристрою",
          "Тип і версія браузера",
          "Час та тривалість вашого перебування на сайті",
          "Переглянуті сторінки",
        ],
      },
      footer: "Ці дані збираються автоматично і використовуються для аналітики",
    },
    dataUsage: {
      intro:
        "Ми використовуємо ваші персональні дані для конкретних цілей, і ніколи не збираємо більше, ніж нам необхідно.",
      items: [
        "Для покращення роботи сайту:",
        "Для надання наших послуг:",
        "Для розсилки новин:",
      ],
    },
    cookies: {
      intro:
        "🍪 Cookie — це маленькі файли, які зберігаються у вашому браузері",
      items: [
        "Ми використовуємо лише базові cookie",
        "Google Analytics допомагає нам збирати анонімну статистику",
      ],
      footer: "Ви можете керувати cookie в налаштуваннях браузера",
      googleAnalytics: "Google Analytics",
    },
    googleAuth: {
      intro:
        "Для вашої зручності ми дозволяємо авторизуватися на нашому сайті через Google-акаунт.",
      items: [
        "Ми отримуємо лише ім'я та email",
        "Ми не збираємо додаткові дані з вашого профілю Google",
      ],
      footer: "Вхід через Google є добровільним.",
    },
    socialNetworks: {
      text1: "На нашому сайті є посилання на наші сторінки в соцмережах",
      text2:
        "Ці іконки не вбудовують віджети і не передають жодної вашої інформації",
      platforms: ["Facebook", "Instagram", "LinkedIn", "YouTube"],
    },
    targetedAds: {
      text1: "Ми не використовуємо таргетовану рекламу на нашому сайті.",
      text2: "Єдиний інструмент для збору статистики — це Google Analytics",
    },
    newsletter: {
      text1:
        "Якщо ви підписались на наші новини, ми будемо надсилати вам інформацію на ваш email.",
      text2: "Ви можете в будь-який момент відписатися від розсилки",
      unsubscribeText: "Відписатися",
    },
    dataRetention: {
      text1: "Ми зберігаємо ваші дані лише стільки, скільки це необхідно",
      text2:
        "Google Analytics зберігає анонімні дані про відвідувачів протягом певного часу (зазвичай до 14 місяців)",
    },
    userRights: {
      intro: "Ви маєте кілька важливих прав щодо своїх персональних даних:",
      items: [
        "Право на доступ:",
        "Право на виправлення:",
        "Право на видалення:",
        "Право на відкликання згоди:",
        "Право на обмеження обробки:",
      ],
      footer:
        "Для того, щоб скористатися своїми правами, просто зв'яжіться з нами",
    },
    contactUs: {
      text: "Якщо у вас є будь-які запитання або побажання щодо цієї Політики конфіденційності, не соромтеся звертатися до нас за через електронну пошту",
      email: "liatoshynsky@gmail.com", // Updated email
      contactLink: "/contacts", // UK link
    },
  },
  en: {
    title: "Privacy Policy",
    intro: {
      text1:
        "We value your trust, therefore we strive to protect your privacy and personal information that you provide to us through our website.",
      text2: "By using our website, you agree to the terms of this Policy.",
      keywords: ["process", "guarantee"],
    },
    dataWeCollect: {
      intro:
        "We collect only the data necessary to provide our services and improve your experience on the website.",
      providedData: {
        title: "Data you provide to us:",
        items: ["Name and email", "Additional data (optional)"],
      },
      autoCollectedData: {
        title: "Data collected automatically:",
        intro:
          "When you visit our website, we collect certain technical information, such as:",
        items: [
          "Your device's IP address",
          "Browser type and version",
          "Time and duration of your visit",
          "Pages viewed",
        ],
      },
      footer: "This data is collected automatically and used for analytics",
    },
    dataUsage: {
      intro:
        "We use your personal data for specific purposes and never collect more than we need.",
      items: [
        "To improve the performance of the website:",
        "For the provision of our services:",
        "For newsletters:",
      ],
    },
    cookies: {
      intro: "🍪 Cookies are small files stored in your browser",
      items: [
        "We use only basic cookies",
        "Google Analytics helps us collect anonymous statistics",
      ],
      footer: "You can manage cookies in your browser settings",
      googleAnalytics: "Google Analytics",
    },
    googleAuth: {
      intro:
        "For your convenience, we allow signing in to our website with a Google account.",
      items: [
        "We only receive your name and email",
        "We do not collect additional data from your Google profile",
      ],
      footer: "Signing in with Google is optional.",
    },
    socialNetworks: {
      text1: "Our website provides links to our social media pages",
      text2:
        "These icons do not embed widgets and do not transfer any of your information",
      platforms: ["Facebook", "Instagram", "LinkedIn", "YouTube"],
    },
    targetedAds: {
      text1: "We do not use targeted advertising on our website.",
      text2: "The only tool we use for statistics is Google Analytics",
    },
    newsletter: {
      text1:
        "If you have subscribed to our updates, we will send information to your email.",
      text2: "You can unsubscribe at any time",
      unsubscribeText: "Unsubscribe",
    },
    dataRetention: {
      text1: "We store your data only for as long as necessary",
      text2:
        "Google Analytics retains anonymized visitor data for a certain period (usually up to 14 months)",
    },
    userRights: {
      intro: "You have several important rights regarding your personal data:",
      items: [
        "Right of access:",
        "Right to rectification:",
        "Right to erasure:",
        "Right to withdraw consent:",
        "Right to restriction of processing:",
      ],
      footer: "To exercise your rights, simply contact us",
    },
    contactUs: {
      text: "If you have any questions or concerns regarding this Privacy Policy, please feel free to contact us via email",
      email: "liatoshynsky@gmail.com",
      contactLink: "/contacts",
    },
  },
};

export const privacyPolicyTestIds = {
  intro: "PrivacyPolicy-intro",
  introTitle: "PrivacyPolicy-intro-title",
  introContent: "PrivacyPolicy-intro-content",
  dataWeCollect: "PrivacyPolicy-dataWeCollect",
  dataUsage: "PrivacyPolicy-dataUsage",
  cookies: "PrivacyPolicy-cookies",
  googleAuth: "PrivacyPolicy-googleAuth",
  socialNetworks: "PrivacyPolicy-socialNetworks",
  targetedAds: "PrivacyPolicy-targetedAds",
  newsletter: "PrivacyPolicy-newsletter",
  dataRetention: "PrivacyPolicy-dataRetention",
  userRights: "PrivacyPolicy-userRights",
  contactUs: "PrivacyPolicy-contactUs",
};
