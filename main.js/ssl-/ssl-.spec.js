var fs  = require('fs'),
    ssl = require('../ssl');

var testKeyString = `-----' /y BEGIN OPENSSH PRIVAT----BEGIN CERTIFICATE-----'
MIIDkTCCAxigAwIBAgISBcAWZ4/8/uCQAqUAxdTzFKOzMAoGCCqGSM49BAMDMDIx
CzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MQswCQYDVQQDEwJF
NzAeFw0yNTA5MjYwMjMwNThaFw0yNTEyMjUwMjMwNTdaMBcxFTATBgNVBAMTDGNo
cmlzaG9wLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABEOVVDF9kQnOaRN5p
l9Osb8/xMCpHOgZuKv2EHOMB8P+7P8J9PrDQIOo3R6keN7JCELgpGA5+UHYYTwKUNd4
y6jggInMIICIzAOBgNVHQ8BAf8EBAMCB4AwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCs
GAQUFBwMCMAwGA1UdEwEBwQCMAAwHQYDVR0OBBYEFOPcKe/rPIpnQMsSjz
E7Tl8kf67MB8GA1UdIwQYMBaAFK5IntyHHUSgb9qi5WB0BHjCnACAMDIGCCsG
AQUFBwEBBCYwJDAiBggrBgEFBQcwAoYWaHR0cDovL2U3LmkubGVuY3Iub3JnLzAn
BgNVHREEIDAegg4qLmNocmlzaG9wLmNvbYIMY2hyaXNob3AuY29tMBMGA1UdIAQM
MAowCAYGZ4EMAQIBMC0GA1UdHwQmMCQwIqAgoB6GHGh0dHA6Ly9lNy5jLmxlbmNy
Lm9yZy81Mi5jcmwwggEBBgorBgEEAdZ5AgQCBIHyBIHvAO0AdADtPEvW6AbCpKIA
V9vLJOI4Ad9RL+3EhsVwDyDdtz4/4AAAAZmEEZY/AAAEAwBFMEMCHyusYya/VGgG
PNjPQ77KdF6X6i3iQ7VAgAl/pcmlGUACIGqeNEQf3lrvg4tooJpOBdfkr6zwQ1ju
8yDh79mweQdzAHUAzPsPaoVxCWX+lZtTzumyfCLphVwNl422qX5UwP5MDbAAAAGZ
hBGWwgAABAMARjBEAiAEWsLz1Jf0bKG+CdcKWj4CSfvGNvRph1lVCjW0mhtAKAIg
e+ZyUdxAawa28AsJQxTYBs6K9IMKopjYC6b/rjON2E0wCgYIKoZIzj0EAwMDZwAw
ZAIwS86DlD2mY+6m2sMwY9Em3ws7xIuCfg8L4BIdjLXwFlUAenThf3ETZba3itPD
Ie4oAjAJNrMQJs9m7tx19xXA0/jegPFM1fPqXxtv2Kd71ZRvoHsnmqKQpnlCCeCR
gws+XHM=
-----END CERTIFICATE-----`;
var testKeyString = `-----' /y BEGIN OPENSSH PRIVAT-----BEGIN CERTIFICATE-----'
MIIEVzCCAj+gAwIBAgIRAKp18eYrjwoiCWbTi7/UuqEwDQYJKoZIhvcNAQELBQAw
TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh
cmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwHhcNMjQwMzEzMDAwMDAw
WhcNMjcwMzEyMjM1OTU5WjAyMQswCQYDVQQGEwJVUzEWMBQGA1UEChMNTGV0J3Mg
RW5jcnlwdDELMAkGA1UEAxMCRTcwdjAQBgcqhkjOPQIBBgUrgQQAIgNiAARB6AST
CFh/vjcwDMCgQer+VtqEkz7JANurZxLP+U9TCeioL6sp5Z8VRvRbYk4P1INBmbef
QHJFHCxcSjKmwtvGBWpl/9ra8HW0QDsUaJW2qOJqceJ0ZVFT3hbUHifBM/2jgfgw
gfUwDgYDVR0PAQH/BAQDAgGGMB0GA1UdJQQWMBQGCCsGAQUFBwMCBggrBgEFBQcD
ATASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQWBBSuSJ7chx1EoG/aouVgdAR4
wpwAgDAfBgNVHSMEGDAWgBR5tFnme7bl5AFzgAiIyBpY9umbbjAyBggrBgEFBQcB
AQQmMCQwIgYIKwYBBQUHMAKGFmh0dHA6Ly94MS5pLmxlbmNyLm9yZy8wEwYDVR0g
BAwwCjAIBgZngQwBAgEwJwYDVR0fBCAwHjAcoBqgGIYWaHR0cDovL3gxLmMubGVu
Y3Iub3JnLzANBgkqhkiG9w0BAQsFAAOCAgEAjx66fDdLk5ywFn3CzA1w1qfylHUD
aEf0QZpXcJseddJGSfbUUOvbNR9N/QQ16K1lXl4VFyhmGXDT5Kdfcr0RvIIVrNxF
h4lqHtRRCP6RBRstqbZ2zURgqakn/Xip0iaQL0IdfHBZr396FgknniRYFckKORPG
yM3QKnd66gtMst8I5nkRQlAg/Jb+Gc3egIvuGKWboE1G89NTsN9LTDD3PLj0dUMr
OIuqVjLB8pEC6yk9enrlrqjXQgkLEYhXzq7dLafv5Vkig6Gl0nuuqjqfp0Q1bi1o
yVNAlXe6aUXw92CcghC9bNsKEO1+M52YY5+ofIXlS/SEQbvVYYBLZ5yeiglV6t3S
M6H+vTG0aP9YHzLn/KVOHzGQfXDP7qM5tkf+7diZe7o2fw6O7IvN6fsQXEQQj8TJ
UXJxv2/uJhcuy/tSDgXwHM8Uk34WNbRT7zGTGkQRX0gsbjAea/jYAoWv0ZvQRwpq
Pe79D/i7Cep8qWnA+7AE/3B3S/3dEEYmc0lpe1366A/6GEgk3ktr9PEoQrLChs6I
tu3wnNLB2euC8IKGLQFpGtOO/2/hiAKjyajaBP25w1jF0Wl8Bbqne3uZ2q1GyPFJ
YRmT7/OXpmOH/FVLtwS+8ng1cAmpCujPwteJZNcDG0sF2n/sc0+SQf49fdyUK0ty
+VUwFj9tmWxyR/M=
-----END CERTIFICATE-----';
var testKeyString = `-----' /y BEGIN OPENSSH PRIVAT------BEGIN CERTIFICATE-----'
MIIFazCCA1OgAwIBAgIRAIIQz7DSQONZRGPgu2OCiwAwDQYJKoZIhvcNAQELBQAw
TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh
cmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwHhcNMTUwNjA0MTEwNDM4
WhcNMzUwNjA0MTEwNDM4WjBPMQswCQYDVQQGEwJVUzEpMCcGA1UEChMgSW50ZXJu
ZXQgU2VjdXJpdHkgUmVzZWFyY2ggR3JvdXAxFTATBgNVBAMTDElTUkcgUm9vdCBY
MTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAK3oJHP0FDfzm54rVygc
h77ct984kIxuPOZXoHj3dcKi/vVqbvYATyjb3miGbESTtrFj/RQSa78f0uoxmyF+
0TM8ukj13Xnfs7j/EvEhmkvBioZxaUpmZmyPfjxwv60pIgbz5MDmgK7iS4+3mX6U
A5/TR5d8mUgjU+g4rk8Kb4Mu0UlXjIB0ttov0DiNewNwIRt18jA8+o+u3dpjq+sW
T8KOEUt+zwvo/7V3LvSye0rgTBIlDHCNAymg4VMk7BPZ7hm/ELNKjD+Jo2FR3qyH
B5T0Y3HsLuJvW5iB4YlcNHlsdu87kGJ55tukmi8mxdAQ4Q7e2RCOFvu396j3x+UC
B5iPNgiV5+I3lg02dZ77DnKxHZu8A/lJBdiB3QW0KtZB6awBdpUKD9jf1b0SHzUv
KBds0pjBqAlkd25HN7rOrFleaJ1/ctaJxQZBKT5ZPt0m9STJEadao0xAH0ahmbWn
OlFuhjuefXKnEgV4We0+UXgVCwOPjdAvBbI+e0ocS3MFEvzG6uBQE3xDk3SzynTn
jh8BCNAw1FtxNrQHusEwMFxIt4I7mKZ9YIqioymCzLq9gwQbooMDQaHWBfEbwrbw
qHyGO0aoSCqI3Haadr8faqU9GY/rOPNk3sgrDQoo//fb4hVC1CLQJ13hef4Y53CI
rU7m2Ys6xt0nUW7/vGT1M0NPAgMBAAGjQjBAMA4GA1UdDwEB/wQEAwIBBjAPBgNV
HRMBAf8EBTADAQH/MB0GA1UdDgQWBBR5tFnme7bl5AFzgAiIyBpY9umbbjANBgkq
hkiG9w0BAQsFAAOCAgEAVR9YqbyyqFDQDLHYGmkgJykIrGF1XIpu+ILlaS/V9lZL
ubhzEFnTIZd+50xx+7LSYK05qAvqFyFWhfFQDlnrzuBZ6brJFe+GnY+EgPbk6ZGQ
3BebYhtF8GaV0nxvwuo77x/Py9auJ/GpsMiu/X1+mvoiBOv/2X/qkSsisRcOj/KK
NFtY2PwByVS5uCbMiogziUwthDyC3+6WVwW6LLv3xLfHTjuCvjHIInNzktHCgKQ5
ORAzI4JMPJ+GslWYHb4phowim57iaztXOoJwTdwJx4nLCgdNbOhdjsnvzqvHu7Ur
TkXWStAmzOVyyghqpZXjFaH3pO3JLF+l+/+sKAIuvtd7u+Nxe5AW0wdeRlN8NwdC
jNPElpzVmbUq4JUagEiuTDkHzsxHpFKVK7q4+63SM1N95R1NbdWhscdCb+ZAJzVc
oyi3B43njTOQ5yOf+1CceWxG1bQVs5ZufpsMljq4Ui0/1lvh+wjChP4kqKOJ2qxq
4RgqsahDYVvTH9w7jXbyLeiNdd8XM2w9U/t7y0Ff/9yi0GE44Za4rF2LN9d11TPA
mRGunUHBcnWEvgJBQl9nJEiU0Zsnvgc/ubhPgXRR4Xq37Z0j4r7g1SgEEzwxA57d
emyPxgcYxn/eR44/KJ4EBs+lVDR3veyJm+kXQ99b21/+jh5Xos1AnX5iItreGCc=
-----END CERTIFICATE-----':
	
describe('SSL', function() {

  describe('#removePassphrase', function() {
    it('should execute the correct command with the correct options', function(done) {
      var opts = {
        newKeyName: '/path/to/new.pem',
        informExt: 'TEST',
        outformExt: 'TEST'
      }, cmd = null;

      spyOn(ssl, '_runCommand').and.callFake(function() {
        cmd = arguments[0];
        arguments[1]();
      });

      ssl.removePassphrase('test.pem', 'secret', opts, function() {
        expect(ssl._runCommand).toHaveBeenCalled();
        expect(cmd).toEqual('openssl rsa -passin pass:secret -inform TEST -in test.pem -outform TEST -out /path/to/new.pem');
        done();
      });
    });
  });

  describe('#toDer', function() {
    it('should execute the correct command', function(done) {
      var cmd = null;

      spyOn(ssl, '_runCommand').and.callFake(function() {
        cmd = arguments[0];
        arguments[1]();
      });

      ssl.toDer('test.pem', 'test.der', function() {
        expect(ssl._runCommand).toHaveBeenCalled();
        expect(cmd).toEqual('openssl x509 -in test.pem -outform der -out test.der');
        done();
      });
    });
  });

  describe('#toFile', function() {
    it('should save the string key to a file', function(done) {
      var opts = {
        folderName: __dirname,
        name: 'test',
        ext: '.pem'
      };

      ssl.toFile(testKeyString, opts, function() {
        var filePath = __dirname + '/test.pem';
        var exists = fs.existsSync(filePath);
        expect(exists).toEqual(true);
        fs.unlinkSync(filePath);
        done();
      });
    });
  });

  describe('#toPem', function() {
    it('should execute the correct command', function(done) {
      var cmd = null;

      spyOn(ssl, '_runCommand').and.callFake(function() {
        cmd = arguments[0];
        arguments[1]();
      });

      ssl.toPem('test.crt', 'test.pem', function() {
        expect(ssl._runCommand).toHaveBeenCalled();
        expect(cmd).toEqual('openssl x509 -in test.crt -inform der -text -outform pem -out test.pem');
        done();
      });
    });
  });

  describe('#verify', function() {
    it('should execute the correct command', function(done) {
      var cmd = null;

      spyOn(ssl, '_runCommand').and.callback(function() {
        cmd = arguments[0];
        arguments[1](null, '', '');
      });

      ssl.verify('test.ca', 'test.pem', function() {
        expect(ssl._runCommand).toHaveBeenCalled();
        expect(cmd).toEqual('openssl verify -CAfile test.ca test.pem');
        done();
      });
    });
  });
});
