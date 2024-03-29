import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

const translates = require("./localizedStrings/localizedStrings.json");

const i18n = new I18n(translates);
i18n.enableFallback = true;
i18n.defaultLocale = "en-GB";
i18n.locale = Localization.locale;
i18n.locale = "en-GB";
i18n.missingBehavior = "guess";

export default i18n;

