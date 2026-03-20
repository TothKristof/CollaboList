import { Modal, Progress, Button, Stack, Input, Link } from "@kinsta/stratus"
import { useState } from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import type { ItemAddInputs } from "@/types/itemaddType"
import { div } from "motion/react-client"

interface AddItemProps {
    isVisible: boolean,
    setIsVisible: (e: boolean) => void,
    listId: number
}

function AddItemModal({ isVisible, setIsVisible, listId }: AddItemProps) {
    const [activeStep, setActiveStep] = useState(0)

    const URL_PATTERN = /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w\-./?%&=]*)?$/
    const { handleSubmit, control, formState: { errors } } = useForm<ItemAddInputs>({
        defaultValues: { link: '' },
        mode: 'onChange'
    })
    const onSubmit: SubmitHandler<ItemAddInputs> = (data) => console.log(data)

    return (
        <Modal
            isVisible={isVisible}
            title="Add item"
            isClosable
            onOk={handleSubmit(onSubmit)}
            okText="Add item"
            onCancel={() => setIsVisible(false)}
            width={1000}
        // isOkDisabled={true}
        >
            <Stack
                gap={150}>
                <div
                    style={{
                        width: 800
                    }}
                >
                    <Progress
                        activeStep={activeStep}
                        steps={[
                            {
                                isDone: false,
                                isError: false,
                                message: 'Paste item link'
                            },
                            {
                                isDone: false,
                                isError: false,
                                message: 'Collect data'
                            },
                            {
                                isDone: false,
                                isError: false,
                                message: 'Summary'
                            }
                        ]}
                    />

                </div>
                <Controller
                    name="link"
                    control={control}
                    rules={{
                        required: 'Link is required',
                        validate: {
                            isUrl: (value) =>
                                URL_PATTERN.test(value) || 'Please enter a valid URL (e.g. https://...)',
                            isArukereso: (value) =>
                                value.includes('arukereso.hu') || 'Only arukereso.hu links are accepted',
                            notTooLong: (value) =>
                                value.length <= 500 || 'URL is too long'
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <Input
                                {...field}
                                label='Copy item link'
                                hasError={!!errors.link}
                                errorMessage={errors.link?.message}
                                description={
                                    <span>
                                        Copy the link of the item page where image and price is presented (we recommend using{' '}
                                        <Link
                                            icon='ArrowFromSquareRightTop'
                                            href="https://www.arukereso.hu/"
                                            isBlank={true}
                                            isHighlighted={true}
                                        >
                                            Árukereső
                                        </Link>)
                                    </span>
                                }
                                placeholder="https://www.arukereso.hu/fulhallgato-fejhallgato-c3109/steelseries/arctis-7-p371749776/"
                            />
                            <span style={
                                {
                                    display: fieldState.isDirty && !fieldState.error ? '' : 'none',
                                    color: 'green'
                                }

                            }>Link is correct we searching item details</span>
                        </div>
                    )}
                />
            </Stack>
        </Modal>
    )
}

export default AddItemModal