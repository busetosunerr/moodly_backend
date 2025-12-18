import cron from "node-cron";
import { sendReminder } from "../notification/notificationService";

/**
 * Günlük hatırlatma cron ile yapılacaktır
 * Her gün saat 21.00da(örnek olarak verilmiştir)
 */
cron.schedule("0 21 * * *", async () => {
  console.log("Daily reminder cron job triggered");
  await sendReminder();
});

/**
Bu raporda tanımlanan bildirim senaryolarını desteklemek amacıyla, bu hafta Firebase Cloud Messaging (FCM) tabanlı bildirim altyapısının teknik tasarımı yapılmıştır.
Backend içerisinde ayrı bir Notification modülü oluşturulmuş, hatırlatma bildirimleri için cron tabanlı bir tetikleme mekanizması kurgulanmış
ve Firebase servis hesabı (service account) ile entegrasyon iskeleti hazırlanmıştır.
Bu aşamada kodlama çalışması, mimari ve entegrasyonun gösterilmesi ile sınırlı tutulmuştur.
 */