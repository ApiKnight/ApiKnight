/* eslint-disable */

import { reportError } from './reportError';

interface XhrPayload {
  method: string;
  url: string;
  status?: number;
}

class XMLHttpRequestWithPayload {
  private originalXhr: XMLHttpRequest;
  payload: XhrPayload = { method: '', url: '' };

  constructor() {
    this.originalXhr = new XMLHttpRequest();
  }

  open(method: string, url: string): void {
    this.payload = { method, url };
    this.originalXhr.open(method, url);
  }

  send(data?: Document | BodyInit | null): void {
    const originalSend = this.originalXhr.send.bind(this.originalXhr);

    this.originalXhr.addEventListener('readystatechange', () => {
      if (
        this.originalXhr.readyState === 4 &&
        this.originalXhr.status &&
        this.originalXhr.status >= 400
      ) {
        this.payload.status = this.originalXhr.status;
        reportError(
          { name: 'xhr-error', data: this.payload },
          this.payload.url,
          'xhr-error',
        );
      }
    });

    originalSend(data);
  }
}

// 4, 封装成一个 monitor
export function createXhrMonitor(url?: string) {
  if (!url) {
    url = window.location.pathname;
  }

  function hookMethod(
    obj: XMLHttpRequestWithPayload,
    key: string,
    hookFunc: Function,
  ) {
    return function (...params: any[]) {
      hookFunc(obj, ...params);
    };
  }

  const xhrWithPayload = new XMLHttpRequestWithPayload();

  function start() {
    hookMethod(
      xhrWithPayload,
      'open',
      (obj: XMLHttpRequestWithPayload, method: string, url: string) => {
        obj.open(method, url);
      },
    )();

    hookMethod(
      xhrWithPayload,
      'send',
      (obj: XMLHttpRequestWithPayload, ...params: any[]) => {
        obj.send(...params);
      },
    )();
  }

  return { name: 'xhr-error', start };
}
