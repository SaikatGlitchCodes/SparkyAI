import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Text,
    Input,
    Textarea,
    Select,
    Button,
    Flex,
    Image,
    Heading,
    Stack,
    Grid,
    GridItem,
    Divider,
    Spinner,
} from '@chakra-ui/react';
import { FiUser, FiMapPin, FiPhone, FiMail, FiHome } from 'react-icons/fi';
import { GiFarmTractor } from 'react-icons/gi';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
    const { 
        user, 
        profile, 
        profileLoading, 
        updateUserProfile, 
        uploadProfileImage,
        isProfileComplete 
    } = useAuth();
    
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        farm_name: '',
        farm_size: '',
        farm_size_unit: 'acres',
        location: '',
        address: '',
        main_crops: '',
        bio: ''
    });

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });

    // Load existing profile data
    useEffect(() => {
        if (profile) {
            setFormData({
                full_name: profile.full_name || '',
                phone: profile.phone || '',
                farm_name: profile.farm_name || '',
                farm_size: profile.farm_size || '',
                farm_size_unit: profile.farm_size_unit || 'acres',
                location: profile.location || '',
                address: profile.address || '',
                main_crops: profile.main_crops || '',
                bio: profile.bio || ''
            });

            if (profile.avatar_url) {
                setAvatarPreview(profile.avatar_url);
            }
        }
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatusMessage({ text: '', type: '' });

        try {
            // Upload avatar if a new one was selected
            if (avatarFile) {
                const { success, url, error } = await uploadProfileImage(avatarFile);
                if (!success) {
                    throw new Error(error || 'Failed to upload image');
                }
            }
            
            // Update profile data
            const { success, error } = await updateUserProfile(formData);

            if (!success) {
                throw new Error(error || 'Failed to update profile');
            }
            
            setStatusMessage({ 
                text: 'Profile updated successfully!', 
                type: 'success' 
            });
            
            // Redirect to dashboard if coming from signup
            const fromParam = new URLSearchParams(window.location.search).get('from');
            if (fromParam === 'signup') {
                navigate('/');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setStatusMessage({ 
                text: error.message || 'Failed to update profile', 
                type: 'error' 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (profileLoading) {
        return (
            <Box textAlign="center" py={20}>
                <Spinner size="xl" color="green.500" thickness="4px" />
                <Text mt={4}>Loading profile data...</Text>
            </Box>
        );
    }

    return (
        <Box maxW="1000px" mx="auto" p={{ base: 4, md: 10 }}>
            <Heading textAlign="center" mb={6}>
                {isProfileComplete() ? 'Edit Your Profile' : 'Complete Your Profile'}
            </Heading>

            <Text textAlign="center" mb={8} color="gray.600">
                Help us personalize your farming experience
            </Text>

            {statusMessage.text && (
                <Box
                    mb={6}
                    p={4}
                    borderRadius="md"
                    bg={statusMessage.type === 'success' ? 'green.100' : 'red.100'}
                    color={statusMessage.type === 'success' ? 'green.800' : 'red.800'}
                >
                    {statusMessage.text}
                </Box>
            )}
            
            <form onSubmit={handleSubmit}>
                {/* Avatar Section */}
                <Box textAlign="center" mb={8}>
                    <Box
                        position="relative"
                        width="150px"
                        height="150px"
                        borderRadius="full"
                        bg="gray.100"
                        mx="auto"
                        mb={2}
                        overflow="hidden"
                        cursor="pointer"
                        onClick={() => document.getElementById('avatar-input').click()}
                    >
                        {avatarPreview ? (
                            <Image
                                src={avatarPreview}
                                alt="Profile"
                                objectFit="cover"
                                width="100%"
                                height="100%"
                            />
                        ) : (
                            <Flex
                                align="center"
                                justify="center"
                                height="100%"
                                color="gray.400"
                            >
                                <FiUser size="60px" />
                            </Flex>
                        )}
                    </Box>

                    <Text
                        fontSize="sm"
                        color="blue.500"
                        cursor="pointer"
                        onClick={() => document.getElementById('avatar-input').click()}
                    >
                        Change Photo
                    </Text>

                    <input
                        id="avatar-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                </Box>

                {/* Two-column layout */}
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
                    {/* Personal Information Column */}
                    <GridItem>
                        <Text fontWeight="bold" fontSize="lg" mb={4}>
                            Personal Information
                        </Text>
                        
                        <Stack spacing={4}>
                            <Box>
                                <Text mb={1} fontWeight="medium">
                                    Full Name <Text as="span" color="red.500">*</Text>
                                </Text>
                                <Flex align="center" position="relative">
                                    <Box position="absolute" left="3" top="2" color="gray.500">
                                        <FiUser />
                                    </Box>
                                    <Input
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        placeholder="Your full name"
                                        pl="10"
                                        required
                                    />
                                </Flex>
                            </Box>
                            
                            <Box>
                                <Text mb={1} fontWeight="medium">
                                    Email Address
                                </Text>
                                <Flex align="center" position="relative">
                                    <Box position="absolute" left="3" top="2" color="gray.500">
                                        <FiMail />
                                    </Box>
                                    <Input
                                        value={user?.email || ''}
                                        readOnly
                                        pl="10"
                                        bg="gray.50"
                                    />
                                </Flex>
                                <Text fontSize="xs" color="gray.500" mt={1}>
                                    Your email cannot be changed
                                </Text>
                            </Box>
                            
                            <Box>
                                <Text mb={1} fontWeight="medium">
                                    Phone Number
                                </Text>
                                <Flex align="center" position="relative">
                                    <Box position="absolute" left="3" top="2" color="gray.500">
                                        <FiPhone />
                                    </Box>
                                    <Input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Your phone number"
                                        pl="10"
                                    />
                                </Flex>
                            </Box>
                            
                            <Box>
                                <Text mb={1} fontWeight="medium">
                                    About You
                                </Text>
                                <Textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    placeholder="Tell us a bit about yourself..."
                                    rows={4}
                                />
                            </Box>
                        </Stack>
                    </GridItem>

                    {/* Farm Information Column */}
                    <GridItem>
                        <Text fontWeight="bold" fontSize="lg" mb={4}>
                            Farm Information
                        </Text>
                        
                        <Stack spacing={4}>
                            <Box>
                                <Text mb={1} fontWeight="medium">
                                    Farm Name <Text as="span" color="red.500">*</Text>
                                </Text>
                                <Flex align="center" position="relative">
                                    <Box position="absolute" left="3" top="2" color="gray.500">
                                        <GiFarmTractor />
                                    </Box>
                                    <Input
                                        name="farm_name"
                                        value={formData.farm_name}
                                        onChange={handleChange}
                                        placeholder="Your farm name"
                                        pl="10"
                                        required
                                    />
                                </Flex>
                            </Box>
                            
                            <Box>
                                <Text mb={1} fontWeight="medium">
                                    Farm Size
                                </Text>
                                <Flex gap={2}>
                                    <Input
                                        name="farm_size"
                                        value={formData.farm_size}
                                        onChange={handleChange}
                                        placeholder="Size"
                                        type="number"
                                    />
                                    {/* <Select
                                        name="farm_size_unit"
                                        value={formData.farm_size_unit}
                                        onChange={handleChange}
                                        width="120px"
                                    >
                                        <option value="acres">Acres</option>
                                        <option value="hectares">Hectares</option>
                                        <option value="sq-ft">Sq. Ft.</option>
                                    </Select> */}
                                </Flex>
                            </Box>
                            
                            <Box>
                                <Text mb={1} fontWeight="medium">
                                    Location <Text as="span" color="red.500">*</Text>
                                </Text>
                                <Flex align="center" position="relative">
                                    <Box position="absolute" left="3" top="2" color="gray.500">
                                        <FiMapPin />
                                    </Box>
                                    <Input
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="City, State"
                                        pl="10"
                                        required
                                    />
                                </Flex>
                            </Box>
                            
                            <Box>
                                <Text mb={1} fontWeight="medium">
                                    Farm Address
                                </Text>
                                <Flex align="center" position="relative">
                                    <Box position="absolute" left="3" top="2" color="gray.500">
                                        <FiHome />
                                    </Box>
                                    <Input
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Your complete address"
                                        pl="10"
                                    />
                                </Flex>
                            </Box>
                            
                            <Box>
                                <Text mb={1} fontWeight="medium">
                                    Main Crops
                                </Text>
                                <Input
                                    name="main_crops"
                                    value={formData.main_crops}
                                    onChange={handleChange}
                                    placeholder="Wheat, Corn, Soybeans, etc."
                                />
                                <Text fontSize="xs" color="gray.500" mt={1}>
                                    Separate different crops with commas
                                </Text>
                            </Box>
                        </Stack>
                    </GridItem>
                </Grid>
                
                {/* <Divider my={8} /> */}
                
                {/* Submit Button - Centered */}
                <Box textAlign="center" mt={6}>
                    <Button
                        type="submit"
                        colorScheme="green"
                        size="lg"
                        px={10}
                        isLoading={isSubmitting}
                        loadingText="Saving..."
                    >
                        {isProfileComplete() ? 'Save Changes' : 'Complete Profile'}
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default ProfilePage;