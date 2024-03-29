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

const Disclaimer = ({ detailsData, contactData }) => {
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
        <title>Disclaimer - Discover Kashmir</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />{" "}
      </Head>
      <Grid container>
        <HeroSection
          usedIn="Contact"
          bgImage="background.jpg"
          Name={"Disclaimer"}
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
                      Discover Kashmir The thediscoverkashmir.com Web Site As A
                      Service To The Public And Web Site Owners.
                    </li>
                    <li style={{ padding: "12px", fontFamily: "monospace" }}>
                      Discover Kashmir Is Not Responsible For, And Expressly
                      Disclaims All Liability For, Damages Of Any Kind Arising
                      Out Of Use, Reference To, Or Reliance On Any Information
                      Contained Within The Site. While The Information Contained
                      Within The Site Is Periodically Updated, No Guarantee Is
                      Given That The Information Provided On This Website Is
                      Correct, Complete, And Up-To-Date.
                    </li>
                    <li style={{ padding: "12px", fontFamily: "monospace" }}>
                      The Organizers Reserve The Right To Evict Any Camper
                      Anytime Without Any Refund If His/Her Actions Violate Any
                      Camp Rules.
                    </li>
                    <li style={{ padding: "12px", fontFamily: "monospace" }}>
                      Although The Discover Kashmir Website May Include Links
                      Providing Direct Access To Other Internet Resources,
                      Including Web Sites, Discover Kashmir Is Not Responsible
                      For The Accuracy Or Content Of Information Contained In
                      These Sites.
                    </li>
                    <li style={{ padding: "12px", fontFamily: "monospace" }}>
                      Links From thediscoverkashmir.com To Third-Party Sites Do
                      Not Constitute An Endorsement By discover Kashmir Of The
                      Parties Or Their Products And Services. The Appearance On
                      The Web Site Of Advertisements And Product Or Service
                      Information Does Not Constitute An Endorsement By discover
                      Kashmir.
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

export default Disclaimer;

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
