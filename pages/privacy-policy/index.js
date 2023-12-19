import {
  Alert,
  Dialog,
  Grid,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import styles from "../../styles/Contact.module.css";
import { useRef } from "react";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useRouter } from "next/router";
import Image from "next/image";

const PrivacyPolicy = ({ detailsData, contactData }) => {
  const theme = useTheme();
  const [open, setopen] = useState(false);
  const bkcolor = "white";
  const [ischecked, setisChecked] = useState(true);
  const router = useRouter();
  const packageName = router.query.packageName;
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleOpen = () => {
    setopen(true);
  };

  const handleClose = () => {
    setopen(false);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    sendForm(
      "service_h37zmnt",
      "template_jpglnfc",
      form.current,
      "uxUACuGSvix8kkLqR"
    )
      .then(
        (result) => {
          handleOpen();
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      )
      .finally(() => {
        document.getElementById("myForm").reset();
      });
  };

  const styleTypo = {
    fontFamily: "Roboto, 'cursive'",
    fontSize: { xs: "12px", md: "1.2vw" },
    fontWeight: "500",
    flexWrap: "wrap",
  };
  const form = useRef();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), {
    defaultMatches: true,
  });

  return (
    <div>
      <Head>
        <title>PrivacyPolicy - Discover Kashmir</title>
        <meta name="description" content="PrivacyPolicy - Discover Kashmir" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />{" "}
      </Head>
      <Grid container>
        <HeroSection
          usedIn="Contact"
          bgImage="background.jpg"
          Name={"Privacy Policy"}
        />
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            width: "100vw",
          }}
        >
          <Grid
            item
            className={styles.cnInnerContainerRight}
            sx={{ width: { xs: "100vw", md: "100vw" } }}
          >
            <Grid container className={styles.cnRightContainer}>
              <Grid item>
                <Typography
                  sx={{
                    fontSize: { xs: "17px", md: "30px" },
                    fontWeight: "700",
                    p: "10px 0",
                  }}
                >
                  Introduction
                </Typography>
                <Typography
                  sx={{ fontSize: { xs: "12px", md: "18px" }, color: "gray" }}
                >
                  The Privacy Policy Is An Online Document That Makes Sure A
                  Users Online Information Is Protected And Is Not Used For
                  Anything That Intends Them Any Harm. All The Pointers Given
                  Under Our Privacy Policy Are Valid Under The Information
                  Technology Act, 2000. This Document Is Updated From Time To
                  Time By Discover Kashmir For The Betterment Of The Same. The
                  Current Version Of The Privacy Policy Is Updated On 17 Nov
                  2023
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "17px", md: "30px" },
                    fontWeight: "700",
                    p: "10px 0",
                  }}
                >
                  Cookies Usage Policy
                </Typography>
                <Typography
                  sx={{ fontSize: { xs: "12px", md: "18px" }, color: "gray" }}
                >
                  We Use Cookies On Our Website To Improve User Experience And
                  Enhance The Load Time For The Users Interacting With Our
                  Website. You May Opt-Out Of The Same If You Want To By
                  Disabling The Cookies For Our Website Using The Web Browsers
                  That You Use To Visit Our Website.
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "17px", md: "30px" },
                    fontWeight: "700",
                    p: "10px 0",
                  }}
                >
                  Outbound Links To Third-Party Websites
                </Typography>
                <Typography
                  sx={{ fontSize: { xs: "12px", md: "18px" }, color: "gray" }}
                >
                  We Have Outbound Links Added To Our Website Which Will Take
                  You To A Third-Party Website That Will Be Completely Unrelated
                  To Us. We Add These Links After Verifying That They Are
                  Operating On The Standard Norms And That They Host Good
                  Content/Service. But Whatever You May Incur Onto A Website
                  Other Than Ours Is Not Our Liability And In Case Of
                  Discrepancy, We Cannot Be Held Liable.
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "17px", md: "30px" },
                    fontWeight: "700",
                    p: "10px 0",
                  }}
                >
                  User Information Protection
                </Typography>
                <Typography
                  sx={{ fontSize: { xs: "12px", md: "18px" }, color: "gray" }}
                >
                  Any User, Whomever They May Be, When They Enter Information
                  Onto Our Site, Its Just So That They Can Avail Of Our Services
                  And We Have No Hidden Agenda From Collecting The Information.
                  We Do Not Share, Export, Or Sell This Information To Anyone
                  And The Data Is Only Shared With Company Employees Who Are
                  Involved In The Facilitation Of Services Only. Other Than
                  That, We Have Proper Security Features Installed On Our
                  Website So That The Digital Data Would Not Be Accessible To
                  Anyone As Well. In Case Of Government Orders, Harsh Weather
                  Conditions, Protests, Landslides, Or Any Other Unforeseen
                  Circumstances, We Work Out The Best Possible Alternate Plans
                  Or Trips/Treks. At Times Even Certain Activities Are Canceled,
                  The Organization Provides The Best Alternative But No Refunds
                  Are Provided. If A Trek Is Called Off At The Last Moment Due
                  To A Natural Calamity/Unforeseen Circumstances like Rain,
                  Snowfall, Earthquake, Landslides, Strike, Bandh, Etc., Ek
                  Karvaan Will Issue A Trek Voucher For The Full Amount And If
                  Possible Will Provide An Alternate Trek. The Voucher Can Be
                  Redeemed Up To The Same Amount For The Same Trek Or Another
                  Trek In The Next 365 Days From The Trek Departure Date. If A
                  Trek Or Trip Cannot Be Completed Due To Natural
                  Calamity/Unforeseen Circumstances Like Rain, Snowfall,
                  Earthquake, Landslides, Strike, Bandh, Etc. No Refund Would Be
                  Provided. Any Extra Expense Coming Due To Any Natural
                  Calamity/Unforeseen Circumstances Like Rain, Snowfall,
                  Earthquake, Landslides, Strike, Bandh, Etc., Will Be Borne By
                  The Customer. The Company Will Not Be Liable.
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "17px", md: "30px" },
                    fontWeight: "700",
                    p: "10px 0",
                  }}
                >
                  Declaration
                </Typography>
                <Typography
                  sx={{ fontSize: { xs: "12px", md: "18px" }, color: "gray" }}
                >
                  Discover Kashmir Declares That We Are Not Going To Use Any
                  User Information Whatsoever In Bad Faith And/Or Sell The
                  Information To Any Third Party Under Any Condition. But If
                  Necessary And In Case A Legal Notice Is Served To Us In Case
                  Of Any Legal Matter, Whatsoever It May Be, We are Going To
                  Share The User Information Under The Right To Informations
                  Act. Additionally, Any Legal Issues Will Be Sorted Out In
                  Jammu and Kashmir Court Only As We are A Firm Registered In
                  Jammu and Kashmir.
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "17px", md: "30px" },
                    fontWeight: "700",
                    p: "10px 0",
                  }}
                >
                  Website Privacy
                </Typography>
                <Typography
                  sx={{ fontSize: { xs: "12px", md: "18px" }, color: "gray" }}
                >
                  Our Website Is Standing There For Providing Services To The
                  Users And In Order To Do That, We May Ask You For Your
                  Information At Times. We Assure You That All The Information
                  That Is Gathered From You Is Being Used For Facilitation
                  Purposes Only And Not For Any Malicious Activity. We Do Not
                  Encourage Data Leaks Or Any Similar Schemes, Which Is Why Your
                  Information Will Be Kept Protected And Only Be Shared With The
                  Members Of The Company Who Are Associated With The
                  Facilitation Of Service For The User Only.
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "17px", md: "30px" },
                    fontWeight: "700",
                    p: "10px 0",
                  }}
                >
                  Website Data Collection
                </Typography>
                <Typography
                  sx={{ fontSize: { xs: "12px", md: "18px" }, color: "gray" }}
                >
                  The Website Asks A User For Personal Information Including
                  Email, Name, Phone Number, Along With A Set Of Other Sets Of
                  Personal Information. This Information Is Necessary For The
                  Proper Execution Of The Services That We’re Facilitating.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PrivacyPolicy;

import path from "path";
import fsPromises from "fs/promises";
import Head from "next/head";
import { sendForm } from "@emailjs/browser";
import dynamic from "next/dynamic";
import HeroSection from "../../Components/HeroSection";
export async function getStaticProps() {
  const jsonDirectory = path.join(process.cwd(), "Data");
  //Read the json data file data.json
  const detailsData = await fsPromises.readFile(
    jsonDirectory + "/Details.json",
    "utf8"
  );
  const contactData = await fsPromises.readFile(
    jsonDirectory + "/Contact.json",
    "utf8"
  );
  return {
    props: {
      detailsData: JSON.parse(detailsData),
      contactData: JSON.parse(contactData),
    },
  };
}
