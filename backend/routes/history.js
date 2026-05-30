const express = require("express");
const supabase = require("../config/supabase");

const router = express.Router();

router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const { data, error } =
      await supabase
        .from("transcriptions")
        .select("*")
        .eq("user_email", email)
        .order("created_at", {
          ascending: false,
        });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;