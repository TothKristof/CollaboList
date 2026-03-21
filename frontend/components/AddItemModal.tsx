import { Modal, Progress, Button, Stack, Input, Link, IconButton } from "@kinsta/stratus"
import { useState } from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import type { ItemAddInputs } from "@/types/itemaddType"
import useAddItemToList from "@/app/features/lists/addItemToList"

interface AddItemProps {
    isVisible: boolean,
    setIsVisible: (e: boolean) => void,
    listId: number,
    addItemToList: Function,
    refetchItems: Function
}

function AddItemModal({ isVisible, setIsVisible, listId, addItemToList, refetchItems  }: AddItemProps) {
    const [activeStep, setActiveStep] = useState(0)

    const URL_PATTERN = /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w\-./?%&=]*)?$/
    const { handleSubmit, control, formState: { errors }, setValue, trigger, getValues } = useForm<ItemAddInputs>({
        defaultValues: { link: '', price: 0, name: '' },
        mode: 'onChange'
    })

    const { fetchItemDetails, fetchedItemDetails, isFetching } = useAddItemToList()

        const onSubmit: SubmitHandler<ItemAddInputs> = async (data) => {
        await addItemToList({
            variables: {
                itemInputs: {
                    listId,
                    name: data.name,
                    price: data.price,
                    link: data.link,
                    imgLink: fetchedItemDetails?.getItemDetailsFromUrl.imgLink
                }
            }
        })
        await refetchItems()
        setIsVisible(false)
    }

    const handleNext = () => {
        if (activeStep === 0) handleStep0()
        if (activeStep === 1) handleStep1()
    }

    const handleStep0 = async () => {
        const valid = await trigger('link')
        if (!valid) return
        const result = await fetchItemDetails({ variables: { url: getValues('link') } })
        if (result.data) {
            setValue('price', result.data.getItemDetailsFromUrl.price, { shouldDirty: true })
            setValue('name', result.data.getItemDetailsFromUrl.name ?? '', { shouldDirty: true })
            setActiveStep(1)
        }
    }

    const handleStep1 = async () => {
        const valid = await trigger(['price', 'name'])
        if (!valid) return
        setActiveStep(2)
    }

    return (
        <Modal
            isVisible={isVisible}
            title="Add item"
            isClosable
            onOk={handleSubmit(onSubmit)}
            okText="Add item"
            onCancel={() => setIsVisible(false)}
            width={1000}
            isOkDisabled={activeStep !== 2}
        >
            <Stack gap={150}>
                <div style={{ width: 800 }}>
                    <Progress
                        activeStep={activeStep}
                        steps={[
                            { isDone: activeStep > 0, isError: false, message: 'Paste item link' },
                            { isDone: activeStep > 1, isError: false, message: 'Collect data' },
                            { isDone: activeStep > 2, isError: false, message: 'Summary' }
                        ]}
                    />
                </div>

                {activeStep === 0 && (
                    <Controller
                        name="link"
                        control={control}
                        rules={{
                            required: 'Link is required',
                            validate: {
                                isUrl: (v) => URL_PATTERN.test(v) || 'Please enter a valid URL (e.g. https://...)',
                                isArukereso: (v) => v.includes('arukereso.hu') || 'Only arukereso.hu links are accepted',
                                notTooLong: (v) => v.length <= 500 || 'URL is too long'
                            }
                        }}
                        render={({ field, fieldState }) => (
                            <Stack gap={100}>
                                <Input
                                    {...field}
                                    label='Copy item link'
                                    hasError={!!fieldState.error}
                                    errorMessage={fieldState.error?.message}
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
                                {fieldState.isDirty && !fieldState.error && (
                                    <span style={{ color: 'green' }}>
                                        Link is correct, we are searching item details
                                    </span>
                                )}
                            </Stack>
                        )}
                    />
                )}

                {activeStep === 1 && fetchedItemDetails && (

                    <Stack direction="row" gap={100} style={{ margin: 'auto' }}>
                        <img
                            src={fetchedItemDetails.getItemDetailsFromUrl.imgLink}
                            alt="Product"
                            style={{ width: 200, height: 'auto' }}
                        />
                        <Stack>
                            <Controller
                                name="price"
                                control={control}
                                rules={{ required: 'Price is required' }}
                                render={({ field, fieldState }) => (
                                    <Input
                                        {...field}
                                        label="Price"
                                        hasError={!!fieldState.error}
                                        errorMessage={fieldState.error?.message}
                                        addonAfter='HUF'
                                    />
                                )}
                            />
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: 'Item name is required' }}
                                render={({ field, fieldState }) => (
                                    <Input
                                        {...field}
                                        label="Item name"
                                        hasError={!!fieldState.error}
                                        errorMessage={fieldState.error?.message}
                                    />
                                )}
                            />
                        </Stack>
                    </Stack>
                )}

                {activeStep === 2 && fetchedItemDetails && (
                    <Stack direction="row" gap={100} style={{ margin: 'auto' }}>
                        <img
                            src={fetchedItemDetails.getItemDetailsFromUrl.imgLink}
                            alt="Product"
                            style={{ width: 200, height: 'auto' }}
                        />
                        <Stack gap={50}>
                            <div>
                                <small style={{ color: 'gray' }}>Item name</small>
                                <p style={{ margin: 0 }}>{getValues('name')}</p>
                            </div>
                            <div>
                                <small style={{ color: 'gray' }}>Price</small>
                                <p style={{ margin: 0 }}>{getValues('price')} HUF</p>
                            </div>
                            <div>
                                <small style={{ color: 'gray' }}>Product link</small>
                                <p style={{ margin: 0 }}>
                                    <a href={getValues('link')} target="_blank" rel="noreferrer">
                                        {getValues('link')}
                                    </a>
                                </p>
                            </div>
                            <div>
                                <small style={{ color: 'gray' }}>Image link</small>
                                <p style={{ margin: 0 }}>
                                    <a href={fetchedItemDetails.getItemDetailsFromUrl.imgLink} target="_blank" rel="noreferrer">
                                        {fetchedItemDetails.getItemDetailsFromUrl.imgLink}
                                    </a>
                                </p>
                            </div>
                        </Stack>
                    </Stack>
                )}

                <Stack direction="row" gap={100} style={{ margin: 'auto' }}>
                    {activeStep > 0 && (
                        <Button
                            icon="ArrowLeft"
                            onClick={() => setActiveStep(activeStep - 1)}
                            style={{ marginRight: 0 }}
                        >
                            Back
                        </Button>
                    )}
                    {activeStep < 2 && (
                        <Button
                            icon="ArrowRight"
                            iconPosition="end"
                            onClick={handleNext}
                            style={{ marginRight: 0 }}
                            isDisabled={isFetching}
                        >
                            {isFetching ? 'Fetching...' : 'Next'}
                        </Button>
                    )}
                </Stack>
            </Stack>
        </Modal>
    )
}

export default AddItemModal