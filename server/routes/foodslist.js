const axios = require('axios').default;
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var knex = require('knex');
var bd = require('../db');

const FDC_API_KEY = process.env.REACT_APP_FDC_API_KEY;

router.post("/chose", async (req, res, next) => {
        const chose = req.body;
        // הצלחתי לקשר את המידע שמגיע מקדימה לאחורה
        // עכשיו אני רוצה לשאול האם יש את המידע במאגר אם לא הכנס אותו אם כן אז תיקח אותו משם
        // if ()
        console.log(chose);
});

module.exports = router;