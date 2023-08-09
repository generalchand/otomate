"use server"
import Imap from 'imap';
import { simpleParser } from 'mailparser';

export async function getgmailinbox() {
    const imapConfig = {
        user: 'otomate2002@gmail.com',
        password: 'nntynyrzszxcfyyb',
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        tlsOptions: { rejectUnauthorized: false }
    };

    return new Promise((resolve, reject) => {
        const imap = new Imap(imapConfig);
        
        imap.once('ready', () => {
            imap.openBox('INBOX', true, () => {
                imap.search(['UNSEEN', ['SINCE', new Date()]], (err, res) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    
                    const f = imap.fetch(res[res.length - 1], { bodies: '' });
                    f.on('message', msg => {
                        msg.on('body', stream => {
                            simpleParser(stream, async (err, parsed) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                resolve(parsed);
                            });
                        });
                        msg.once('attributes', attrs => {
                            const { uid } = attrs;
                            imap.addFlags(uid, ['\\Seen'], () => {
                                console.log('Marked as read!');
                            });
                        });
                    });
                    f.once('error', ex => {
                        reject(ex);
                    });
                    f.once('end', () => {
                        console.log('Done fetching all messages!');
                        imap.end();
                    });
                });
            });
        });

        imap.once('error', err => {
            reject(err);
        });

        imap.once('end', () => {
            console.log('Connection ended');
        });

        imap.connect();
    });
}
