const express = require("express")
const { authCheck } = require("../middelware/authCheck")
const { aggregationFunction } = require("../aggregation/aggregation")
const router = express.Router()

router.post("/getlikesDetaile",authCheck,aggregationFunction)

module.exports= router