import twilio from "twilio";

export default (req, res) => {
  const token = new twilio.jwt.AccessToken(
    process.env.TWILIO_SID!,
    process.env.TWILIO_KEY_SID!,
    process.env.TWILIO_KEY_SECRET!,
    { identity: req.query.identity }
  );

  token.addGrant(
    new twilio.jwt.AccessToken.VideoGrant({
      room: req.query.roomName
    })
  );

  res.statusCode = 200;
  res.json({ token: token.toJwt() });
};
