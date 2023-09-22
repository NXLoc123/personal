import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  Stripe: Stripe;
  API_KEY: string;
  constructor(private configsService: ConfigService) {
    this.Stripe = new Stripe(this.configsService.get('stripe.secret_key'), {
      apiVersion: this.configsService.get('stripe.api_version'),
    });
    this.API_KEY = this.configsService.get('stripe.api_key');
  }

  private getStripeConfig() {
    return { apiKey: this.API_KEY };
  }

  async getBalance() {
    try {
      return await this.Stripe.balance.retrieve(this.getStripeConfig());
    } catch (error) {
      throw error;
    }
  }

  async getRatesOfCurrencies() {
    try {
      return await this.Stripe.exchangeRates.list(this.getStripeConfig());
    } catch (error) {
      throw error;
    }
  }

  async createPayment(amount: number, currency: string) {
    try {
      return this.Stripe.paymentIntents.create(
        { amount, currency },
        this.getStripeConfig(),
      );
    } catch (error) {
      throw error;
    }
  }
}
