import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #1c1c1c;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const TextDeslogando = styled.Text`
  font-size:20px;
  color:#FFF;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 40px;
`;