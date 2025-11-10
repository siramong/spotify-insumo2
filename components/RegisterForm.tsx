import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import { COLORS } from '../lib/Constants/Colors';
import { registerSchema } from '../lib/Schemas/Validations/registerValidation';

interface RegisterFormProps {
  onSubmit: (values: z.infer<typeof registerSchema>) => void;
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSubmit, onSwitchToLogin }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string[]; email?: string[]; password?: string[] }>({});

  const validateField = <T,>(field: keyof typeof errors, schema: z.ZodType<T>, value: T) => {
    const result = schema.safeParse(value);
    if (!result.success) {
      setErrors(prev => ({ ...prev, [field]: result.error.flatten().formErrors }));
    } else {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleNameChange = (text: string) => {
    setName(text);
    validateField('name', registerSchema.shape.name, text);
  }

  const handleEmailChange = (text: string) => {
    setEmail(text);
    validateField('email', registerSchema.shape.email, text);
  }

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validateField('password', registerSchema.shape.password, text);
  }

  const handleSubmit = () => {
    const result = registerSchema.safeParse({ name, email, password });
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
        Registro
      </Text>
      
      <TextInput
        className="w-full p-4 mb-1 rounded-lg"
        style={{ backgroundColor: COLORS.card, color: COLORS.text }}
        placeholder="Nombre"
        placeholderTextColor={COLORS.textSecondary}
        value={name}
        onChangeText={handleNameChange}
      />
      {errors.name && (
        <Text style={{ color: 'red', marginLeft: 5, marginBottom: 5 }}>{errors.name[0]}</Text>
      )}
      
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
          Registrarse
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity className="mt-4 active:opacity-70" onPress={onSwitchToLogin}>
        <Text className="text-center" style={{ color: COLORS.textSecondary }}>
          ¿Ya tienes cuenta? <Text style={{ color: COLORS.primary }}>Inicia sesión</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}