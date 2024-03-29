import {
  Alert,
  Button,
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

const Emi = ({ detailsData, contactData }) => {
  const theme = useTheme();
  const [open, setopen] = useState(false);
  const [emiObj, setEmiObj] = useState({});
  const [gsm, setGsm] = useState("");
  const [error, setError] = useState("");
  const [pf, setPf] = useState("");
  const [amount, setAmount] = useState(0);
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

  const calculatePF = (amount) => {
    var pf = null;

    if (amount <= 50000) {
      pf = 999;
    } else if (amount > 50000 && amount <= 100000) {
      pf = 1999;
    } else if (amount > 100000 && amount <= 200000) {
      pf = 3999;
    } else if (amount >= 200001 && amount <= 400000) {
      pf = 5999;
    } else if (amount > 400000) {
      pf = 9999;
    }
    var gst = 0.18;
    pf = pf * (1 + gst);
    return pf;
  };

  function calculateGSM(amount) {
    var gsm = Math.max(1000, 0.01 * amount);
    return gsm;
  }

  function calculateEMI(amount) {
    // GST = 18%
    // GSM = MAX(1000, 1%*Amt)
    // Total loan amount (LA) = Amt
    var totalLoan = Math.round(amount);
    var tenures = {
      "3_zero": 0.333,
      "6_zero": 0.167,
      3: 0.343,
      6: 0.175,
      9: 0.12,
      12: 0.092,
      18: 0.064,
      24: 0.05,
    };
    var result = {};
    Object.keys(tenures).forEach(function (key) {
      result[key] = Math.round(totalLoan * tenures[key]);
    });
    return result;
  }

  const calculateDetails = (amt) => {
    console.log(amt, "amt");
    const amount = parseInt(amt);
    if (amount >= 10000) {
      setError("");
      const pf = calculatePF(amount);
      const gsm = calculateGSM(amount);
      const EMIs = calculateEMI(amount);
      setPf(pf);
      setGsm(gsm);
      setEmiObj(EMIs);
      console.log(emiObj, "obj");
    } else {
      setError("Amount should be greater than or equal to 10000");
    }
  };
  const EmiTable = ({ emiObj }) => {
    return (
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Duration</th>
            <th style={tableHeaderStyle}>EMI</th>
          </tr>
        </thead>
        <tbody>
          {emiObj &&
            Object.entries(emiObj).map(([duration, emi]) => (
              <tr key={duration}>
                <td style={tableCellStyle}>{duration} months</td>
                <td style={tableCellStyle}>Rs {emi} / month</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  // Define styles as objects
  const tableHeaderStyle = {
    border: "1px solid #dddddd",
    backgroundColor: "#f2f2f2",
    textAlign: "left",
    padding: "8px",
  };

  const tableCellStyle = {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px",
  };
  return (
    <div>
      <Head>
        <title>Get in Touch - Discover Kashmir</title>
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
          Name={"Travel Now Pay Later"}
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
            className={styles.cnInnerContainerLeft}
            sx={{ width: { xs: "100vw", md: "40vw" } }}
          >
            <Grid
              className={styles.cnLeftContainer}
              container
              sx={{
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
                minHeight: { md: "439px" },
                width: { md: "27vw" },
                flexWrap: "wrap",
              }}
            >
              <Typography variant="h5">Package EMI calculator</Typography>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: { xs: "center", md: "unset" },
                  alignItems: "center",
                  textAlign: { xs: "center", md: "unset" },
                  m: "10px 0",
                  width: "100%",
                }}
              >
                <TextField
                  name="amount"
                  fullWidth
                  required
                  id="outlined-required"
                  label="Package Amount"
                  placeholder="Package Amount"
                  onChange={(e) => {
                    setAmount(e?.target?.value);
                  }}
                />
                <Button
                  sx={{
                    marginLeft: "10px",
                  }}
                  variant="contained"
                  onClick={() => calculateDetails(amount)}
                >
                  Calculate
                </Button>
              </Grid>
              {error && (
                <div style={{ color: "red", marginTop: "8px" }}>{error}</div>
              )}
              <hr
                style={{
                  height: "1px",
                  color: "gray",
                  background: "black",
                  width: "100%",
                }}
              />
              {pf && <Typography>Processing fee = {pf}</Typography>}
              {gsm && <Typography>GSM = {gsm}</Typography>}
              {emiObj && <EmiTable emiObj={emiObj} />}
            </Grid>
          </Grid>
          <Grid
            item
            className={styles.cnInnerContainerRight}
            sx={{ width: { xs: "100vw", md: "50vw" } }}
          >
            <Grid container className={styles.cnRightContainer}>
              <button
                style={{ fontFamily: "'Comfortaa', sans-serif" }}
                className={styles.cnButton}
              >
                Check Eligibility
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Emi;

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
