#define ENABLE_USER_AUTH
#define ENABLE_DATABASE

#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <FirebaseClient.h>

// Firebase user auth
UserAuth user_auth("AIzaSyCStxpdrM-1JUDytr_5e-kGXOryio7UV2k", "buesomaria345@gmail.com", "RiveraBues01718");

// Firebase app and database setup
FirebaseApp app;
WiFiClientSecure ssl_client1, ssl_client2;
using AsyncClient = AsyncClientClass;
AsyncClient async_client1(ssl_client1), async_client2(ssl_client2);
RealtimeDatabase Database;
AsyncResult dbResult;

String letraAnterior = "";
String oracionActual = "";
bool subidaHecha = false;
unsigned long ultimaDeteccion = 0;

void asyncCB(AsyncResult &aResult) {}
void processData(AsyncResult &aResult) {
  if (!aResult.isResult()) return;
  if (aResult.available()) {
    Serial.printf("task: %s, payload: %s\n", aResult.uid().c_str(), aResult.c_str());
  }
}

void setup() {
  Serial.begin(115200);
  WiFi.begin("Familia Bueso", "Bueso2570020");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("📶 Conectado con IP: ");
  Serial.println(WiFi.localIP());

  ssl_client1.setInsecure();
  ssl_client2.setInsecure();
  ssl_client1.setConnectionTimeout(1000);
  ssl_client1.setHandshakeTimeout(5);
  ssl_client2.setConnectionTimeout(1000);
  ssl_client2.setHandshakeTimeout(5);

  initializeApp(async_client1, app, getAuth(user_auth), processData, "authTask");
  app.getApp<RealtimeDatabase>(Database);
  Database.url("https://wawabot-f1358-default-rtdb.firebaseio.com");

  Serial.println("📶 Firebase App está lista.");
}

void loop() {
  app.loop();

  int dedogordo = analogRead(34);
  int dedoindice = analogRead(35);
  int dedomedio = analogRead(32);
  int dedoanular = analogRead(33);
  int dedomenique = analogRead(39);

  String letraDetectada = "";

  // 👇 Solo estos ifs deberían bastar por ahora
  if (dedogordo >= 2800 && dedoindice >= 1700 && dedomedio >= 1136 && dedoanular >= 1200 && dedomenique < 2200){
    letraDetectada = "A";
  }
  else if (dedogordo >= 2000 && dedogordo <= 3000 &&
           dedoindice >= 3100 && dedomedio >= 2800 &&
           dedoanular >= 1600 && dedoanular <= 3800 &&
           dedomenique >= 3400) {
    letraDetectada = "B";
  }
  else if (dedogordo >= 2700 && dedogordo <= 3150 &&
           dedoindice >= 1900 && dedoindice <= 2800 &&
           dedomedio >= 2100 && dedomedio <= 2800 &&
           dedoanular >= 1300 && dedoanular <= 2710 &&
           dedomenique >= 2400 && dedomenique <= 2900) {
    letraDetectada = "C";
  }

  // 👇 imprimimos siempre que detecta una letra (aunque sea repetida)
  if (letraDetectada != "") {
    Serial.println("🔠 Letra detectada: " + letraDetectada);
    Serial.println("📝 Oración: " + oracionActual + letraDetectada);

    // Esto aún funciona para Firebase
    oracionActual += letraDetectada;

    if (app.ready()) {
      String path = "/guante/oracion_actual";
      bool status = Database.set<String>(async_client2, path, oracionActual);
      if (status) {
        Serial.println("✅ Subido a Firebase.");
      } else {
        Firebase.printf("❌ Error al subir: %s\n", async_client2.lastError().message().c_str());
      }
    }
  }

  delay(500); // Tiempo para evitar lecturas múltiples por segundo
}
