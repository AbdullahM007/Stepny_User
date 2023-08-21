import React, {useState} from 'react';
import {Modal, View, Text, TextInput, Button} from 'react-native';
import StarRating from 'react-native-star-rating';

const ReviewPopup = ({visible, onClose, onSubmit}) => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');

  const handleRatingChange = newRating => {
    setRating(newRating);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View>
        <Text>Leave a Review</Text>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={rating}
          selectedStar={handleRatingChange}
        />
        <TextInput
          placeholder="What was your issue?"
          onChangeText={text => setDescription(text)}
          value={description}
          multiline={true}
        />
        <Button title="Submit" onPress={() => onSubmit(rating, description)} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default ReviewPopup;
