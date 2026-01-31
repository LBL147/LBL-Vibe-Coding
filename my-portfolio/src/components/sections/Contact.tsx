import { motion } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";
import { Button } from "../ui/Button";

export const Contact = () => (
  <motion.section
    id="contact"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    className="mx-auto max-w-4xl px-6 py-24 text-center"
  >
    <SectionTitle title="保持联系" subtitle="有兴趣合作、交流或邀请我加入项目？" />
    <p className="mt-6 text-lg text-text-muted">
      发送邮件告诉我你的想法，我会在最短时间内回复。期待一起把大胆的创意落地成型。
    </p>
    <div className="mt-10">
      <Button href="mailto:hello@vibecoding.dev">发送邮件</Button>
    </div>
  </motion.section>
);
