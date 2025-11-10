import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import { COLORS } from '../lib/Constants/Colors';
import { loginSchema } from '../lib/Schemas/Validations/loginValidation';

interface LoginFormProps {
  onSubmit: (values: z.infer<typeof loginSchema>) => void;
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onSubmit, onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string[]; password?: string[] }>({});

  const validateField = <T,>(field: keyof typeof errors, schema: z.ZodType<T>, value: T) => {
    const result = schema.safeParse(value);
    if (!result.success) {
      setErrors(prev => ({ ...prev, [field]: result.error.flatten().formErrors }));
    } else {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    validateField('email', loginSchema.shape.email, text);
  }

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validateField('password', loginSchema.shape.password, text);
  }

  const handleSubmit = () => {
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
    } else {
      setErrors({});
      onSubmit(result.data);
    }
  };

  return (
    <View className="w-full px-6">
      <Text className="text-3xl font-bold mb-8 text-center" style={{ color: COLORS.text }}>
        Iniciar Sesión
      </Text>
      
      <TextInput
        className="w-full p-4 mb-1 rounded-lg"
        style={{ backgroundColor: COLORS.card, color: COLORS.text }}
        placeholder="Email"
        placeholderTextColor={COLORS.textSecondary}
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && (
        <Text style={{ color: 'red', marginLeft: 5, marginBottom: 5 }}>{errors.email[0]}</Text>
      )}
      
      <TextInput
        className="w-full p-4 mb-1 rounded-lg"
        style={{ backgroundColor: COLORS.card, color: COLORS.text }}
        placeholder="Contraseña"
        placeholderTextColor={COLORS.textSecondary}
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
      />
      {errors.password && (
        <Text style={{ color: 'red', marginLeft: 5, marginBottom: 5 }}>{errors.password[0]}</Text>
      )}
      
      <TouchableOpacity
        className="w-full p-4 rounded-full mt-5 mb-4 active:opacity-80"
        style={{ backgroundColor: COLORS.primary }}
        onPress={handleSubmit}
      >
        <Text className="text-center font-bold text-lg" style={{ color: COLORS.text }}>
          Iniciar Sesión
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity className="mt-4 active:opacity-70" onPress={onSwitchToRegister}>
        <Text className="text-center" style={{ color: COLORS.textSecondary }}>
          ¿No tienes cuenta? <Text style={{ color: COLORS.primary }}>Regístrate</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}