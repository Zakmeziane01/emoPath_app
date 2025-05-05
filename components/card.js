import { View, Text, TouchableOpacity } from "react-native";

interface Props {
    onPress?: () => void;
    children?: React.ReactNode;
}

export const Card = ({ onPress, children }: Props) => {
    return (
        <TouchableOpacity onPress={onPress} className="bg-white rounded-lg shadow-sm p-4">
            <View>
                {children}
            </View>
        </TouchableOpacity>
    );
};