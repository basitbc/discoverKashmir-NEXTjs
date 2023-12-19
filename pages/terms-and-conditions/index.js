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

const TermsAndConditions = ({ detailsData, contactData }) => {
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
        <title>Terms and Conditions - Discover Kashmir</title>
        <meta
          name="description"
          content="Terms and Conditions - Discover Kashmir"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />{" "}
      </Head>
      <Grid container>
        <HeroSection
          usedIn="Contact"
          bgImage="background.jpg"
          Name={"Terms and Conditions"}
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
                  sx={{ fontSize: { xs: "9px", md: "16px" }, color: "gray" }}
                >
                  <ul>
                    <li style={{ padding: "12px", fontFamily: "monospace" }}>
                      {" "}
                      Full Payment Of The Trip Cost Must Be Made Before The Trip
                      Begins. Pending Payments May Eventually Lead To The
                      Cancellation Of The Trip. Slots Will Be Confirmed Only
                      After Receipt Of Full Payment. No Refunds Shall Be Made
                      Towards Any Inclusion(S) Not Availed By The Client.
                    </li>
                    <li style={{ padding: "12px", fontFamily: "monospace" }}>
                      The IDs Shall All Be Verified Before Boarding. No Boarding
                      Shall Be Entertained Without A Valid Govt. ID. The
                      Transfer Of The Bookings Is Not Permitted. Only The Names
                      Mentioned At The Time Of Confirmation Shall Be Allowed To
                      Travel.
                    </li>
                    <li style={{ padding: "12px", fontFamily: "monospace" }}>
                      The Organizers Reserve The Right To Evict Any Camper
                      Anytime Without Any Refund If His/Her Actions Violate Any
                      Camp Rules.
                    </li>
                    <li style={{ padding: "12px", fontFamily: "monospace" }}>
                      Discover Kashmir Is Not Responsible For Your Whereabouts
                      Or Safety If You Are Outside The Campsite Premises. Any
                      Loss To The Camping Materials Such As Tents, Pillows,
                      Mattresses, Or Any Property Belonging To The Campsite Will
                      Is Subject To Full Payment Of Product MRP.
                    </li>
                    <li style={{ padding: "12px", fontFamily: "monospace" }}>
                      The Weapon, Fireworks, And Toxic Substances Are Not
                      Allowed At This Tour And Management Would Not Be
                      Responsible For Any Person Who Has Been Found Guilty Under
                      The Indian Law.
                    </li>
                    <li style={{ padding: "12px", fontFamily: "monospace" }}>
                      Travelers Must Take Care Of Their Luggage & Belongings.
                      The Management Shall Not Be Accountable For Missing Items
                      Along The Tour.
                    </li>
                    <li style={{ padding: "12px", fontFamily: "monospace" }}>
                      The Time Of Departure Is Stated & Fixed. All Travelers
                      Must Update Their Status With The Trip Coordinator(S), &
                      Report At The Pickup Point 30 Mins Prior To The Scheduled
                      Departure.
                    </li>
                    <li style={{ padding: "12px", fontFamily: "monospace" }}>
                      The Air Conditioning Will Be Switched Off In The Hills.
                      Also, During The Trip, It Shall Be The Driver’s Discretion
                      To Put Off The AC As & When Required, Considering The
                      Travelers’ Safety & Ease Of Travel Along Uneven &
                      Dangerous Routes.
                    </li>
                    <li style={{ padding: "12px", fontFamily: "monospace" }}>
                      Our Time Of Departure Is Fixed And Must Depart By The
                      Stated Time & Keep Their Status Updated With The Trip
                      Coordinator(S). Anyone Missing The Bus Shall Not Be
                      Eligible For Any Refunds. We Shall Call You Twice Before
                      The Scheduled Departure.
                    </li>
                    <li style={{ padding: "12px", fontFamily: "monospace" }}>
                      Drinking & Smoking Are Strictly Prohibited Along The Tour
                      Due To Health & Safety Concerns. Our Tours Involve
                      Physically Demanding Activities Such As Trekking, Camping
                      At High Altitudes And We Recommend For You To Be In The
                      Right Shape To Make Most Of Them.
                    </li>
                    <li style={{ padding: "12px", fontFamily: "monospace" }}>
                      Discover Kashmir And Its Organizers Strictly Prohibit The
                      Utilization Of Narcotics And Banned Substances During The
                      Tours And Would Not Be Responsible For Any Adversities To
                      The Same.
                    </li>
                    <li style={{ padding: "12px", fontFamily: "monospace" }}>
                      We Do Not Provide Any Insurance Policy To Cover For The
                      Expenditure On Sickness Or Accidents Or Losses Incurred
                      Due To Theft Or Other Reasons.
                    </li>
                    <li style={{ padding: "12px", fontFamily: "monospace" }}>
                      Numerous Factors Such As Weather And Road Conditions The
                      Physical Ability Of Participants Etc. May Bring Alteration
                      In The Itinerary. We Reserve The Right To Make Necessary
                      Changes In The Schedule In The Interest Of Safety,
                      Comfort, And General Well-Being!
                    </li>
                  </ul>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default TermsAndConditions;

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
