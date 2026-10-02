# Operations and troubleshooting

## การตั้งค่า

- Node.js 24, npm ci จาก lockfile
- Secrets: GEMINI_API_KEY และ TAVILY_API_KEY
- Gemini: gemini-3.5-flash-lite
- Tavily: basic, auto_parameters false, สูงสุด 6 queries/รอบ
- เวลา: 03:17 Asia/Bangkok; GitHub cron UTC 20:17 ของวันก่อน
- workflow_dispatch ใช้ทดสอบได้ ไม่รับรองว่าตาราง cron เริ่มตรงวินาที

## อ่านผลรอบแรก

| Log | ความหมาย |
| --- | --- |
| Gemini usage | token ของแต่ละ request; รวมสามบรรทัดเพื่อได้ usage ต่อรอบ |
| Search credit usage | credits ต่อ query; basic ปกติ 1 ต่อครั้ง |
| No changes | ไม่มีข้อมูลใหม่ที่เสนอในรอบนี้ ไม่ commit/deploy |
| Validated N research updates | JSON ผ่าน validation; ยังต้องรอ build/push/deploy |
| research success / deploy skipped | อาจไม่มี changes ไม่ได้แปลว่า deploy ผิดพลาด |

## Error

| อาการ | ตรวจ |
| --- | --- |
| Gemini 404 | ชื่อโมเดลและสิทธิ์ API key; อย่าแก้เป็น paid fallback เงียบ ๆ |
| Gemini 400 | request config/JSON ไม่รองรับ ต้องดู API details แบบไม่แสดง key |
| 401/403 | key, project restrictions, สิทธิ์ repo |
| 429 | quota/rate limits; หยุดรอบ ไม่ retry วนไม่จำกัด |
| Tavily 432/433 | เครดิต/วงเงิน อย่าเปิด billing โดยอัตโนมัติ |
| No usable results | query หรือแหล่งไม่มีผล เปลี่ยนคำค้น/ตรวจ provider |
| Invalid update batch | โมเดลไม่คืน array ตาม schema ไม่เผยแพร่ |
| Missing research source | URL ในแถวไม่อยู่ใน evidence จริง ไม่เผยแพร่ |
| Insufficient page evidence | มี snippet อย่างเดียวไม่พอแก้ verified row |
| git push rejected | main เปลี่ยนระหว่างรัน ตรวจ diff และรันใหม่ ไม่ force push |
| deploy failure | Pages environment, artifact, permissions และ jobs log |

## งบ

วันละครั้งไม่เกิน 6 basic queries: ประมาณ 180 credits/30 วัน ยังมี manual runs และการใช้งานอื่นร่วมโควตา โมเดลสาม requests/รอบใช้ input จากข้อมูลเดิมและ evidence; ยิ่งข้อมูลเพิ่ม usage ยิ่งเพิ่ม การเพิ่มคู่มือไม่ได้เพิ่มเพดาน query อัตโนมัติ

ราคาหรือโควตาเปลี่ยนได้ ดู dashboard จริงก่อนเลือก paid plan. ไม่บันทึก keys ใน JSON, Markdown, git หรือ log

## การตรวจ code

```bash
node --test scripts/daily-research.test.mjs
npm run build
```

## Audit

ข้อมูลที่เปลี่ยนและ web evidence อยู่ research/YYYY-MM-DD.json; หลายรอบวันเดียวใช้ไฟล์ชื่อเดียวกัน แต่ git history รักษารอบที่ถูก commit. รอบ No changes ปัจจุบันไม่มี report file ใหม่; usage อ่านจาก Actions log. ถ้าต้องการประวัติทุกผลค้น ต้องเพิ่ม audit แยก ไม่สรุปว่าระบบบันทึกครบอยู่แล้ว

รายงานที่เก็บไม่มีผลรับรองความถูกต้องอัตโนมัติ ผู้ดูแลควรตรวจวันปิด/สิทธิ์สมัครที่สำคัญก่อนตัดสินใจสมัคร
