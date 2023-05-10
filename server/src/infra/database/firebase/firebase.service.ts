import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Firestore } from "@google-cloud/firestore";

@Injectable()
export class FirebaseService extends Firestore implements OnModuleInit {
  constructor() {
    super({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });
  }

  async onModuleInit() {
    try {
      this.settings({ ignoreUndefinedProperties: true });

      // test connection
      await this.collection('customers').limit(1).get();

    } catch (error) {
      Logger.error('Firebase connection error', error);
      this.terminate();
      process.exit(1);
    }

    Logger.log('Firebase connection success');
  }
}