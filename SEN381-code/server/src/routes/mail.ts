import { Router, Request, Response } from 'express';
import { Email } from '../mailing/email';

const router = Router();
const mailing = new Email();

router.post('/SendMail', async (req: Request, res: Response) => {
  const Data = req.body;
  res.send(await mailing.send(Data.email, Data.subject, Data.text));
});

export default router;