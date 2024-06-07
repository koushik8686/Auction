
const session = require("express-session");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

function set_sellersession(req, content) {
  // Ensure that req.session is defined before setting properties
  if (req.session) {
    req.session.sellerID = content; // Store the user ID in req.session.userId
  } else {
    console.error("Session middleware not properly initialized");
  }
}

function get_sellersession(req) {
  return req.session.sellerID
}

async function delete_sellerSession (req, res) {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.sendStatus(500); // Internal Server Error
    } else {
      res.redirect('/sellerlogin'); // Redirect to the login page or any other desired location
    }
  });
}
module.exports= {set_sellersession, get_sellersession ,delete_sellerSession }