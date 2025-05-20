import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Flex,
    Input,
    VStack,
    HStack,
    Heading,
    Text,
    Textarea,
    Select,
    Image,
    InputGroup,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiUser, FiMapPin, FiPhone, FiMail, FiHome } from 'react-icons/fi';
import { GiFarmTractor } from 'react-icons/gi';
import { useAuth } from '../context/AuthContext';

const MotionBox = motion(Box);

const ProfilePage = () => {
    const { user, profile, profileLoading, updateUserProfile, uploadProfileImage, isProfileComplete } = useAuth();
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

        try {
            // Upload avatar if selected
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

            // Redirect to dashboard if coming from signup
            if (new URLSearchParams(window.location.search).get('from') === 'signup') {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            p={{ base: 4, md: 10 }}
            maxWidth="1000px"
            mx="auto"
        >
            <Heading as="h1" mb={8} textAlign="center">
                Complete Your Profile
            </Heading>

            <Text mb={6} textAlign="center" color="gray.600">
                Help us personalize your experience by filling in your profile details.
            </Text>

            <form onSubmit={handleSubmit}>
                <Flex direction={{ base: 'column', md: 'row' }} gap={10}>
                    {/* Avatar and Personal Info */}
                    <VStack
                        spacing={6}
                        align="stretch"
                        flex="1"
                        as={motion.div}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Box textAlign="center" mb={4}>
                            <Box
                                cursor='pointer'
                                position="relative"
                                width="150px"
                                height="150px"
                                borderRadius="full"
                                bg="gray.100"
                                mx="auto"
                                overflow="hidden"
                                _hover={{ opacity: 0.8 }}
                                transition="all 0.3s"
                            >
                                {avatarPreview ? (
                                    <Image
                                        src={avatarPreview}
                                        alt="Avatar preview"
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
                                <Box
                                    position="absolute"
                                    bottom="0"
                                    left="0"
                                    right="0"
                                    bg="blackAlpha.600"
                                    color="white"
                                    py={1}
                                    fontSize="sm"
                                >
                                    Change Photo
                                </Box>
                            </Box>
                            <Input
                                id="avatar"
                                name="avatar"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                display="none"
                            />
                        </Box>

                        <Text>Full Name</Text>
                        <InputGroup>
                            <Box>
                                <FiUser color="gray.300" />
                            </Box>
                            <Input
                                name="full_name"
                                placeholder="Your full name"
                                value={formData.full_name}
                                onChange={handleChange}
                            />
                        </InputGroup>

                        <Text>Phone Number</Text>
                        <InputGroup>
                            <Box>
                                <FiPhone color="gray.300" />
                            </Box>
                            <Input
                                name="phone"
                                placeholder="Your phone number"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </InputGroup>

                        <Text>Email Address</Text>
                        <InputGroup>
                            <Box>
                                <FiMail color="gray.300" />
                            </Box>
                            <Input
                                value={user?.email || ''}
                                isReadOnly
                                bg="gray.50"
                            />
                        </InputGroup>
                        <Text>Your email cannot be changed</Text>

                        <Text>About You</Text>
                        <Textarea
                            name="bio"
                            placeholder="Tell us a bit about yourself..."
                            value={formData.bio}
                            onChange={handleChange}
                            rows={4}
                        />
                    </VStack>

                    {/* Farm Info */}
                    <VStack
                        spacing={6}
                        align="stretch"
                        flex="1"
                        as={motion.div}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Text>Farm Name</Text>
                        <InputGroup>
                            <Box>
                                <GiFarmTractor />
                            </Box>
                            <Input
                                name="farm_name"
                                placeholder="Your farm name"
                                value={formData.farm_name}
                                onChange={handleChange}
                            />
                        </InputGroup>

                        <Text>Farm Size</Text>
                        <HStack>
                            <Input
                                name="farm_size"
                                placeholder="Size"
                                type="number"
                                value={formData.farm_size}
                                onChange={handleChange}
                                flex="2"
                            />
                            <Select
                                name="farm_size_unit"
                                value={formData.farm_size_unit}
                                onChange={handleChange}
                                flex="1"
                            >
                                <option value="acres">Acres</option>
                                <option value="hectares">Hectares</option>
                                <option value="sq-ft">Sq. Ft.</option>
                            </Select>
                        </HStack>

                        <Text>Location</Text>
                        <InputGroup>
                            <Box>
                                <FiMapPin />
                            </Box>
                            <Input
                                name="location"
                                placeholder="City, State"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </InputGroup>

                        <Text>Farm Address</Text>
                        <InputGroup>
                            <Box>
                                <FiHome />
                            </Box>
                            <Input
                                name="address"
                                placeholder="Your complete address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </InputGroup>

                        <Text>Main Crops</Text>
                        <Input
                            name="main_crops"
                            placeholder="Wheat, Corn, Soybeans, etc."
                            value={formData.main_crops}
                            onChange={handleChange}
                        />
                        <Text>Separate different crops with commas</Text>
                    </VStack>
                </Flex>

                <Box mt={10} textAlign="center">
                    <Button
                        type="submit"
                        colorScheme="green"
                        size="lg"
                        px={10}
                        isLoading={isSubmitting}
                        loadingText="Saving..."
                        as={motion.button}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Save Profile
                    </Button>
                </Box>
            </form>
        </MotionBox>
    );
};

export default ProfilePage;