import Link from "next/link";
import { ReactElement } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import { TitleHeader } from "@/components/header/titleHeader";
import { CommonFooter } from "@/components/footer/commonFooter";
import CommonLayout from "@/components/layout/commonLayout";
import CommonHead from "@/components/head/commonHead";
import utilStyles from '@/styles/utils.module.css'
import { authorName, mailAddress } from "@/lib/constant";

const appName = 'Piconica';

const PrivacyPolicyPage: NextPageWithLayout = (): JSX.Element => {
    return (
        <>
            <TitleHeader props={{ name: appName, src: '/images/piconica.png' }} />

            <main>
                <h1 className={utilStyles.headingLg}>Privacy Policy</h1>

                <h2 className={utilStyles.headingMd}>Introduction</h2>
                <p>
                    {appName} (hereinafter referred to as "this app") is an app for Android device created by {authorName} (hereinafter referred to as "the developer").
                    This app does not collect<span className={utilStyles.cite}>[1]</span> any personal information from the user.
                    However, some of the permissions requested by this app may temporarily use user data.
                    This Privacy Policy is to help you understand the permissions that this app requests when you use it.
                </p>
                <p className={utilStyles.cite} id="note-1">
                    [1] "Collect" means the transfer of data from a user's device to Developer itself or to a third parties.
                </p>

                <h2 className={utilStyles.headingMd}>Permissions requested by Piconica</h2>
                <p>
                    The main permissions requested by this app are storage access and Bluetooth access.
                    Some of these permissions are for temporary processing<span className={utilStyles.cite}>[2]</span> of user data.
                    In this app, temporary processing is done by reading files and detecting Bluetooth devices.
                </p>
                <p className={utilStyles.cite} id="note-2">
                    [2] "Temporarily processing" means that the data will be stored only in memory,
                    will not be retained beyond the period necessary to respond to the target request in real time,
                    and will not be used for any other purpose.
                </p>

                <h2 className={utilStyles.headingMd}>About storage access permissions</h2>
                <p>
                    For Android 9 or lower devices, the "Storage Write Permission" is required for recording and file operations.
                    In addition to this, the "Storage Read Permission" is required to read the recording files.
                    Once these permissions are allowed by the user, the recording files created by this app can be read from the user data on the storage,
                    and the recording and file operations features can be provided to the user.
                    <br />
                    If you are using Piconica version 4.0 or higher on an Android 10 or higher device, this app does not require storage access permissions.
                    However, in the following cases, this app cannot access the recording files and limited access permission is required.
                </p>
                <ul className={utilStyles.list}>
                    <li key={1}>When updating from Piconica version 3.1.1 or lower (due to changes in the recording process)</li>
                    <li key={2}>Reinstalling after uninstalling (due to the system unlinking this app and files)</li>
                </ul>
                <p>
                    In order to access the previous recording files again, "Allow media access only" in "File and media permission" is required.
                    Once this permission is allowed by the user, the unlinked recording files can be read.
                    Recording and file operations do not require permissions, but once a recording files has been unlinked,
                    the user will be asked for consent to make any modifications (such as renaming).
                    In any case, the user data on the storage will be temporarily processed only for reading the files created by this app.
                </p>

                <h2 className={utilStyles.headingMd}>About Bluetooth access permission</h2>
                <p>
                    For Android 11 or lower devices, the "Location Permission" is required to detect Bluetooth devices.
                    Once this permission is allowed by the user, the Bluetooth device can be detected.
                    The location information will be temporarily processed only for the detection of Bluetooth devices.
                    <br />
                    If you don't want to allow this app to access your device's location,
                    you can pair your Android device with a Bluetooth (BLE) device beforehand so that it doesn't need to perform detection.
                    This app will display paired devices preferentially.
                </p>

                <h2 className={utilStyles.headingMd}>User Rights</h2>
                <p>
                    Recordings made using this app are the copyrighted work of the user,
                    as long as they do not infringe on the copyrights of third parties.
                    You do not need to ask the developer for the licenses to use it.
                </p>

                <h2 className={utilStyles.headingMd}>Email Terms</h2>
                <p>
                    Emails sent by users to the developer will be stored on Gmail's servers.
                    This mail will not be disclosed or transferred to a third parties without the user's consent unless it is against the law or public order and morals.
                </p>

                <h2 className={utilStyles.headingMd}>About this policy</h2>
                <p>
                    This policy will be updated from time to time.
                    However, the developer understands that users may have concerns about the security of your personal information on Android devices.
                    The developer will try to request the least amount of permissions only when necessary.
                </p>

                <h2 className={utilStyles.headingMd}>Disclaimer</h2>
                <p>
                    Please note that although the developer will make every effort to improve the quality of this app,
                    it is not guaranteed that all Android users will be satisfied with it. The developer is not responsible for any damage caused by this app.
                    Please understand again.
                </p>

                <h2 className={utilStyles.headingMd}>Developer</h2>
                <p>{authorName}</p>
                <p><Link href={`mailto:${mailAddress}`}>{mailAddress}</Link></p>
                <p>Effective date: March 12, 2022</p>

            </main>
        </>
    )
};

PrivacyPolicyPage.getLayout = (page: ReactElement): JSX.Element => {
    const title = `${appName} Privacy Policy`;
    return (
        <>
            <CommonHead title={title} />

            <CommonLayout>
                {page}
            </CommonLayout>

            <CommonFooter />
        </>
    )
};

export default PrivacyPolicyPage;