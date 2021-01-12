import twilio from "twilio";

export default (req, res) => {
  const token = new twilio.jwt.AccessToken(
    process.env.TWILIO_SID!,
    process.env.TWILIO_KEY_SID!,
    process.env.TWILIO_KEY_SECRET!,
    { identity: "User " + (Math.floor(Math.random() * 1000) + 100) }
  );

  token.addGrant(
    new twilio.jwt.AccessToken.VideoGrant({
      room: "test room2",
    })
  );

  res.statusCode = 200;
  res.json({ token: token.toJwt() });
};
