package me.x2gd4.dollphone.applications;

import me.x2gd4.dollphone.R;

import androidx.annotation.NonNull;

// TODO: Remove `//` below to enable OneSignal
//import com.onesignal.OneSignal;

import candybar.lib.applications.CandyBarApplication;

public class CandyBar extends CandyBarApplication {
    @NonNull
    @Override
    public Class<?> getDrawableClass() {
        return R.drawable.class;
    }

    @NonNull
    @Override
    public Configuration onInit() {
        // Sample configuration
        Configuration configuration = new Configuration();

        configuration.setGenerateAppFilter(true);
        configuration.setGenerateAppMap(true);
        configuration.setGenerateThemeResources(true);
        configuration.setIncludeIconRequestToEmailBody(true);
        
        DonationLink[] donationLinks= new DonationLink[]{
                new DonationLink(
                        // You can use png file (without extension) inside drawable-nodpi folder or url
                        "paypal",
                        "PayPal",
                        "Send me a tip",
                        "https://paypal.me/itsspelledhaley"),
                new DonationLink(
                        // You can use png file (without extension) inside drawable-nodpi folder or url
                        "ko_fi",
                        "Ko-fi",
                        "Buy me a coffee",
                        "https://ko-fi.com/itsspelledhaley")
        };
        configuration.setDonationLinks(donationLinks);

        return configuration;
    }
}
