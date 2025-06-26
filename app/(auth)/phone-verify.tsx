import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Phone } from 'lucide-react-native';
import { router } from 'expo-router';

export default function PhoneVerifyScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (phoneNumber.length < 10) {
      Alert.alert('خطأ', 'يرجى إدخال رقم هاتف صحيح');
      return;
    }
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCodeSent(true);
      setLoading(false);
      Alert.alert('تم الإرسال', 'تم إرسال رمز التحقق إلى هاتفك');
    }, 1500);
  };

  const handleVerifyCode = async () => {
    if (verificationCode.length < 4) {
      Alert.alert('خطأ', 'يرجى إدخال رمز التحقق');
      return;
    }
    
    setLoading(true);
    // Simulate verification
    setTimeout(() => {
      setLoading(false);
      router.replace('/(auth)/profile-setup');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>تسجيل الدخول</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Phone size={48} color="#16A085" />
        </View>

        <Text style={styles.title}>
          {codeSent ? 'تحقق من رقم هاتفك' : 'أدخل رقم هاتفك'}
        </Text>
        
        <Text style={styles.subtitle}>
          {codeSent 
            ? `أدخل الرمز المرسل إلى ${phoneNumber}`
            : 'سنرسل لك رمز تحقق عبر الرسائل النصية'
          }
        </Text>

        {!codeSent ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.phoneInput}
              placeholder="05XXXXXXXX"
              placeholderTextColor="#BDC3C7"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              textAlign="right"
              maxLength={10}
            />
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>🇸🇦 +966</Text>
            </View>
          </View>
        ) : (
          <View style={styles.codeContainer}>
            <TextInput
              style={styles.codeInput}
              placeholder="أدخل الرمز"
              placeholderTextColor="#BDC3C7"
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="number-pad"
              textAlign="center"
              maxLength={6}
            />
          </View>
        )}

        <TouchableOpacity 
          style={[styles.primaryButton, loading && styles.disabledButton]}
          onPress={codeSent ? handleVerifyCode : handleSendCode}
          disabled={loading}
        >
          <Text style={styles.primaryButtonText}>
            {loading ? 'جاري المعالجة...' : codeSent ? 'تحقق' : 'إرسال الرمز'}
          </Text>
        </TouchableOpacity>

        {codeSent && (
          <TouchableOpacity 
            style={styles.resendButton}
            onPress={handleSendCode}
          >
            <Text style={styles.resendButtonText}>إعادة إرسال الرمز</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Cairo-SemiBold',
    color: '#2C3E50',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  phoneInput: {
    flex: 1,
    height: 56,
    borderWidth: 2,
    borderColor: '#ECF0F1',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    backgroundColor: '#F8F9FA',
  },
  countryCode: {
    width: 100,
    height: 56,
    borderWidth: 2,
    borderColor: '#ECF0F1',
    borderRadius: 12,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  countryCodeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2C3E50',
  },
  codeContainer: {
    marginBottom: 32,
  },
  codeInput: {
    height: 56,
    borderWidth: 2,
    borderColor: '#ECF0F1',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    backgroundColor: '#F8F9FA',
    letterSpacing: 8,
  },
  primaryButton: {
    backgroundColor: '#16A085',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#BDC3C7',
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#FFFFFF',
  },
  resendButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  resendButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-SemiBold',
    color: '#16A085',
    textDecorationLine: 'underline',
  },
});